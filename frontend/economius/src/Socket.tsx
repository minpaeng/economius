import React, { useState, useEffect, useRef } from 'react';
import sockjs from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { RoomIdState, IsModalOpenState, MonthlyModalOpenState, NowPlayerState, NowPlayerPositionState, MovementCardsState } from './recoil/animation/atom';
import {
    TradeRealEstateState,
    TradeStockState,
    TradeGoldState,
    TradeBankState,
    TradeInsuranceState,
    BuyAmountState,
    SellAmountState,
    StockDetailState,
    GoldDetailState,
} from './recoil/trading/atom';
import { ShowSpinnerState, StockInfoState, RealEstateInfoState, BankInfoState, ChanceCardInfoState} from './recoil/modalInfo/atom';

const buildingIds = {
    4: 1,
    14: 2,
    22: 3,
};

const stockIds = {
    1: 1,
    3: 2,
    5: 3,
    7: 4,
    9: 5,
    11: 6,
    13: 7,
    15: 8,
    17: 9,
    19: 10,
    21: 11,
    23: 12,
    25: 13,
    27: 14,
    29: 15,
    31: 16,
};

const bankIds = {
    2: 1,
    10: 2,
    18: 3,
};

function PlayerSocket() {
    const [roomId, setRoomId] = useRecoilState(RoomIdState);
    const [isOpen, setIsOpen] = useRecoilState(IsModalOpenState);
    const [nowPlayer, setNowPlayerState] = useRecoilState(NowPlayerState);
    const [nowPlayerPosition, setNowPlayerPosition] = useRecoilState(NowPlayerPositionState);
    const [movementCards, setMovementCards] = useRecoilState(MovementCardsState);
    // 자산별 모달 정보
    const [showSpinner, setShowSpinner] = useRecoilState(ShowSpinnerState);
    const [stockInfo, setStockInfo] = useRecoilState(StockInfoState);
    const [realEstateInfo, setRealEstateInfo] = useRecoilState(RealEstateInfoState);
    const [bankInfo, setBankInfo] = useRecoilState(BankInfoState);
    const [monthlyModalOpen, setMonthlyModalOpen] = useRecoilState(MonthlyModalOpenState);
    // 자산별 거래 여부
    const [tradeRealEstate, setTradeRealEstate] = useRecoilState(TradeRealEstateState);
    const [tradeStock, setTradeStock] = useRecoilState(TradeStockState);
    const [tradeGold, setTradeGold] = useRecoilState(TradeGoldState);
    const [tradeBank, setTradeBank] = useRecoilState(TradeBankState);
    const [tradeInsurance, setTradeInsurance] = useRecoilState(TradeInsuranceState);
    // 매수량, 매도량
    const [buyAmount, setbuyAmount] = useRecoilState(BuyAmountState);
    const [sellAmount, setSellAmount] = useRecoilState(SellAmountState);

    const setStockDetail = useSetRecoilState(StockDetailState);
    const setGoldDetail = useSetRecoilState(GoldDetailState);

//이벤트 카드
    const [chanceCardInfo, setChanceCardInfo] = useRecoilState(ChanceCardInfoState);

    const stompClient = useRef(null);

    useEffect(() => {
        // 소켓 연결
        stompClient.current = Stomp.over(() => new sockjs('http://j9b109.p.ssafy.io:8080/ws'));

        const connectHandler = () => {
            // stompClient가 null인 경우 연결하지 않음
            if (!stompClient.current) {
                return;
            }
            stompClient.current.connect(
                {
                    // Authorization: "access token"
                },
                function () {
                    // 방 입장은 이전 페이지에서

                    // 개인 메시지 구독 => sub/{roomId}/{playerId}
                    stompClient.current.subscribe(`/sub/${roomId}/1`, function (recievedMessage: any) {
                        console.log('개인메시지', recievedMessage);
                        console.log('개인메시지', recievedMessage.body);
                        const message = JSON.parse(recievedMessage.body); // 객체
                        const type = recievedMessage.headers.type; // 문자열
                        // 주식 변경 recoil 시작
                        if (type === 'stockDetail') {
                            setStockDetail({
                                stockId: message.stockId,
                                name: message.name,
                                stockIndustryId: message.stockIndustryId,
                                companyCategory: message.companyCategory,
                                companySubCategory: message.companySubCategory,
                                owners: message.owners,
                                remainingAmount: message.remainingAmount,
                                price: message.price,
                                rate: message.rate,
                                priceHistory: message.priceHistory,
                                rateHistory: message.rateHistory,
                            });
                        }
                        if (type === 'selectGolds') {
                            setGoldDetail({
                                player: message.player,
                                price: message.price,
                                rate: message.rate,
                                priceHistory: message.priceHistory,
                                rateHistory: message.rateHistory,
                            });
                        }
                        // 주식 recoil 종료
                    });

                    // 방 메시지 구독 => sub/{roomId}
                    stompClient.current.subscribe(`/sub/${roomId}`, function (recievedMessage: any) {
                        const message = JSON.parse(recievedMessage.body);
                        const type = recievedMessage.headers.type;
                        console.log('전체메시지', type);
                        console.log('전체메시지', message);
                        if (type == 'visitBuilding') {
                            setRealEstateInfo({
                                buildingId: message.buildingId,
                                buildingPrice: message.buildingPrice,
                                changeAmount: message.changeAmount,
                                visitor: message.visitor,
                                owner: message.owner,
                            });
                            setShowSpinner(true);
                        }
                        if (type == 'bank') {
                            setBankInfo({
                                player: message.player,
                                money: message.money,
                                have: message.have,
                                name: message.name,
                                monthlyDeposit: message.monthlyDeposit,
                                currentPrice: message.currentPrice,
                                currentCount: message.currentCount,
                                finishCount: message.finishCount,
                                rate: message.rate,
                            });
                            setShowSpinner(true);
                        }
                        if(type == 'eventCard') {
                            setChanceCardInfo({
                                moneyCard: message.moneyCard,
                                name: message.name,
                                description: message.description,
                                eventValue: message.eventValue,
                                url: message.url,
                            })
                        }
                     });
                }
            );
        };

        connectHandler();
    }, []);

    // 자산별 방문
    useEffect(() => {
        if (!isOpen) return;

        // 부동산 방문
        if ([4, 14, 22].includes(nowPlayerPosition)) {
            // isOpen 상태가 true일 때 메시지를 보내는 코드를 추가
            if (stompClient.current) {
                stompClient.current.send('/pub/1/visitBuilding', {}, JSON.stringify({ player: nowPlayer + 1, buildingId: buildingIds[nowPlayerPosition] }));
                // 0번째 player를 서버에 1로 보내줘야 해서
            }
        }
        //주식 방문
        else if (nowPlayerPosition & 1) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/buyItem', {}, JSON.stringify({ player: nowPlayer + 1, stockId: stockIds[nowPlayerPosition] })); // 상품구매
                stompClient.current.send('/pub/1/stockDetail', {}, JSON.stringify({ player: nowPlayer + 1, stockId: stockIds[nowPlayerPosition] }));
            }
        }
        // 금거래소 방문
        else if (nowPlayerPosition === 30) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/selectGolds', {}, JSON.stringify({ player: nowPlayer + 1 }));
            }
        }
        // 은행 방문
        else if ([2, 10, 18].includes(nowPlayerPosition)) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/bank', {}, JSON.stringify({ player: nowPlayer + 1, bankId: bankIds[nowPlayerPosition] }));
            }
        }
        // 보험 방문
        else if ([6, 26].includes(nowPlayerPosition)) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/insurance`, {}, JSON.stringify({ player: nowPlayer + 1, insuranceId: '' }));
            }
        }
        // 찬스 카드 방문
        else if ([12, 20, 28].includes(nowPlayerPosition)) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/eventCard`, {}, JSON.stringify({ player: nowPlayer + 1 }));
            }
        }
    }, [isOpen]);

    // 월말정산
    useEffect(() => {
        if (!monthlyModalOpen) return;
        // 출발점 통과
        if (stompClient.current) {
            stompClient.current.send(`/pub/${roomId}/calculate`, {}, JSON.stringify({ player: nowPlayer + 1 }));
        }
    }, [monthlyModalOpen]);

    // 부동산 거래
    useEffect(() => {
        if (tradeRealEstate[0]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/buyBuilding', {}, JSON.stringify({ player: nowPlayer + 1, buildingId: buildingIds[nowPlayerPosition] }));
                setTradeRealEstate([false, false]);
                // // 1초 후에 턴 종료
                // setTimeout(() => {
                //     stompClient.current.send('/pub/1/finishTurn', {});
                // }, 1000);
            }
        } else if (tradeRealEstate[1]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/sellBuilding', {}, JSON.stringify({ player: nowPlayer + 1, buildingId: buildingIds[nowPlayerPosition] }));
                setTradeRealEstate([false, false]);
                // stompClient.current.send('/pub/1/finishTurn', {});
            }
        }
    }, [tradeRealEstate]);

    // 주식 거래
    useEffect(() => {
        if (tradeStock[0]) {
            if (stompClient.current) {
                stompClient.current.send(
                    '/pub/1/buyStock',
                    {},
                    JSON.stringify({ player: nowPlayer + 1, stockId: stockIds[nowPlayerPosition], stockAmount: buyAmount })
                );
                setTradeStock([false, false]);
            }
        } else if (tradeStock[1]) {
            if (stompClient.current) {
                stompClient.current.send(
                    '/pub/1/sellStock',
                    {},
                    JSON.stringify({ player: nowPlayer + 1, stockId: stockIds[nowPlayerPosition], stockAmount: sellAmount })
                );
                setTradeStock([false, false]);
            }
        }
    }, [tradeStock]);

    // 금 거래
    useEffect(() => {
        if (tradeGold[0]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/buyGolds', {}, JSON.stringify({ player: nowPlayer + 1, goldAmount: buyAmount }));
                setTradeGold([false, false]);
            }
        } else if (tradeGold[1]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/sellGolds', {}, JSON.stringify({ player: nowPlayer + 1, goldAmount: sellAmount }));
                setTradeGold([false, false]);
            }
        }
    }, [tradeGold]);

    // 은행 거래
    useEffect(() => {
        if (tradeBank[0]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/joinSavings', {}, JSON.stringify({ player: nowPlayer + 1, bankId: bankIds[nowPlayerPosition] }));
                setTradeBank([false, false]);
            }
        } else if (tradeBank[1]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/stopSavings', {}, JSON.stringify({ player: nowPlayer + 1, bankId: bankIds[nowPlayerPosition] }));
                setTradeBank([false, false]);
            }
        }
    }, [tradeBank]);

    // 보험 거래
    useEffect(() => {
        if (tradeInsurance[0]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/joinInsurance', {}, JSON.stringify({ player: nowPlayer + 1, insuranceId: 1 }));
                setTradeInsurance([false, false, false, false]);
            }
        }
        if (tradeInsurance[1]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/joinInsurance', {}, JSON.stringify({ player: nowPlayer + 1, insuranceId: 2 }));
                setTradeInsurance([false, false, false, false]);
            }
        }
        if (tradeInsurance[2]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/joinInsurance', {}, JSON.stringify({ player: nowPlayer + 1, insuranceId: 3 }));
                setTradeInsurance([false, false, false, false]);
            }
        }
        if (tradeInsurance[3]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/joinInsurance', {}, JSON.stringify({ player: nowPlayer + 1, insuranceId: 4 }));
                setTradeInsurance([false, false, false, false]);
            }
        }
    }, [tradeInsurance]);

    return <></>;
}

export default PlayerSocket;
