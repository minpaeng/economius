import React, { useState, useEffect, useRef } from 'react';
import sockjs from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    RoomIdState,
    IsModalOpenState,
    MonthlyModalOpenState,
    NowPlayerState,
    NowPlayerPositionState,
    MovementCardsState,
    CallBackState,
    UseridState,
    RoomJoinState,
    RoomJoinUsersNicknameState,
} from './recoil/animation/atom';
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
import { PortfolioState, StockState } from '/src/recoil/game/atom.tsx';
import { func } from 'three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements';
import { MonthlyInfoState, StockInfoState, RealEstateInfoState, BankInfoState, ChanceCardInfoState, InsuranceInfoState } from './recoil/modalInfo/atom';

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
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const [nowPlayer, setNowPlayerState] = useRecoilState(NowPlayerState);
    const [nowPlayerPosition, setNowPlayerPosition] = useRecoilState(NowPlayerPositionState);
    const [movementCards, setMovementCards] = useRecoilState(MovementCardsState);
    const [monthlyModalOpen, setMonthlyModalOpen] = useRecoilState(MonthlyModalOpenState);
    // 자산별 모달 정보
    const [monthlyInfo, setMonthlyInfo] = useRecoilState(MonthlyInfoState);
    const [stockInfo, setStockInfo] = useRecoilState(StockInfoState);
    const [realEstateInfo, setRealEstateInfo] = useRecoilState(RealEstateInfoState);
    const [bankInfo, setBankInfo] = useRecoilState(BankInfoState);
    const [insuranceInfo, setInsuranceInfo] = useRecoilState(InsuranceInfoState);
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
    const setPortfolio = useSetRecoilState(PortfolioState);
    const setStocks = useSetRecoilState(StockState);
    const [callBack, setCallBack] = useRecoilState(CallBackState);

    //이벤트 카드
    const [chanceCardInfo, setChanceCardInfo] = useRecoilState(ChanceCardInfoState);

    // 방 연결을 위한 recoil
    const [userId, setUserId] = useRecoilState(UseridState);
    const [roomId, setRoomId] = useRecoilState(RoomIdState);
    const [roomJoin, setRoomJoin] = useRecoilState(RoomJoinState);
    const [roomJoinUsersNickname, setRoomJoinUsersNickname] = useRecoilState(RoomJoinUsersNicknameState);
    const nickname = localStorage.getItem('nickname');
    const playername = localStorage.getItem('player');

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
                    // 방 참가 => sub/{player}
                    // 방 입장 중 잘못된 방식으로 입장하는 경우
                    stompClient.current.subscribe(`/sub/${playername}`, function (recievedMessage: any) {
                        const message = JSON.parse(recievedMessage.body);
                        console.log('전체메시지', message);
                        if (message.code == '') {
                            console.log('정상');

                            // 없는 방인 경우
                        } else if (message.code == 1000) {
                            alert('해당 번호는 없는 방입니다.');
                        }
                        // 이미 들어간 방인 경우
                        else if (message.code == 1006) {
                            alert('이미 있는 접속한 방에 다시 접속하였습니다.');
                        }
                        // else if (type == 'bank') {
                        //     setBankInfo({
                        //         player: message.player,
                        //         money: message.money,
                        //         have: message.have,
                        //         bankId: message.savingDto.bankId,
                        //         name: message.savingDto.name,
                        //         monthlyDeposit: message.savingDto.monthlyDeposit,
                        //         currentPrice: message.savingDto.currentPrice,
                        //         currentCount: message.savingDto.currentCount,
                        //         finishCount: message.savingDto.finishCount,
                        //         rate: message.savingDto.rate,
                        //     });
                        // }
                    });

                    // 방 메시지 구독 => sub/{roomId}
                    stompClient.current.subscribe(`/sub/5`, function (recievedMessage: any) {
                        const message = JSON.parse(recievedMessage.body);
                        const type = recievedMessage.headers.type || null;
                        console.log('전체메시지', type);
                        console.log('전체메시지', message);
                        if (type === 'finishTurn') {
                            setStocks(message.stocks);
                            setPortfolio(message.portfolios);
                        }
                        if (type == 'visitBuilding') {
                            setRealEstateInfo({
                                buildingId: message.buildingId,
                                buildingPrice: message.buildingPrice,
                                changeAmount: message.changeAmount,
                                visitor: message.visitor,
                                owner: message.owner,
                            });
                        } else if (type == 'bank') {
                            setBankInfo({
                                player: message.player,
                                money: message.money,
                                have: message.have,
                                bankId: message.savingDto.bankId,
                                name: message.savingDto.name,
                                monthlyDeposit: message.savingDto.monthlyDeposit,
                                currentPrice: message.savingDto.currentPrice,
                                currentCount: message.savingDto.currentCount,
                                finishCount: message.savingDto.finishCount,
                                rate: message.savingDto.rate,
                            });
                        } else if (type == 'calculate') {
                            setMonthlyInfo({
                                player: message.player,
                                salary: message.receipt.salary,
                                savingFinishBenefit: message.receipt.savingFinishBenefit,
                                tax: message.receipt.tax,
                                savingsPrice: message.receipt.savingsPrice,
                                insurancePrice: message.receipt.insurancePrice,
                                totalIncome: message.receipt.totalIncome,
                                money: message.receipt.money,
                            });
                        } else if (type == 'eventCard') {
                            setChanceCardInfo({
                                moneyCard: message.moneyCard,
                                name: message.name,
                                description: message.description,
                                eventValue: message.eventValue,
                                url: message.url,
                                apply: message.apply,
                            });
                        } else if (type == 'insurance') {
                            setInsuranceInfo({
                                player: message.player,
                                have1: message.have[1],
                                have2: message.have[2],
                                have3: message.have[3],
                                have4: message.have[4],
                                insurance1: message.insuranceDto[1],
                                insurance2: message.insuranceDto[2],
                                insurance3: message.insuranceDto[3],
                                insurance4: message.insuranceDto[4],
                            });
                        }
                        // 새로운 방을 입장하는 경우
                        else if (type == 'join') {
                            console.log('JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJjjjjjjjjjjjjjJJJoin');

                            const player1 = message.players[0];
                            const player2 = message.players[1];
                            const player3 = message.players[2];
                            const player4 = message.players[3];
                            console.log('player1');

                            let nick1 = message.nicknames[player1];
                            let nick2 = message.nicknames[player2];
                            let nick3 = message.nicknames[player3];
                            let nick4 = message.nicknames[player4];

                            if (nick1 == undefined) nick1 = '';
                            if (nick2 == undefined) nick2 = '';
                            if (nick3 == undefined) nick3 = '';
                            if (nick4 == undefined) nick4 = '';

                            setRoomJoinUsersNickname([nick1, nick2, nick3, nick4]);
                            console.log(roomJoinUsersNickname);
                        }
                    });
                }
            );
        };

        connectHandler();
    }, []);

    useEffect(() => {
        console.log('hello');

        console.log(roomJoinUsersNickname);
    }, [roomJoinUsersNickname]);

    // 자산별 방문
    useEffect(() => {
        if (!isModalOpen) return;

        // 부동산 방문
        if ([4, 14, 22].includes(nowPlayerPosition)) {
            // isOpen 상태가 true일 때 메시지를 보내는 코드를 추가
            if (stompClient.current) {
                stompClient.current.send(
                    `/pub${roomId}1/visitBuilding`,
                    {},
                    JSON.stringify({
                        player: nowPlayer + 1,
                        buildingId: buildingIds[nowPlayerPosition],
                    })
                );
                // 0번째 player를 서버에 1로 보내줘야 해서
            }
        }
        //주식 방문
        else if (nowPlayerPosition & 1) {
            if (stompClient.current) {
                stompClient.current.send(
                    `/pub/${roomId}/buyItem`,
                    {},
                    JSON.stringify({
                        player: nowPlayer + 1,
                        stockId: stockIds[nowPlayerPosition],
                    })
                ); // 상품구매
                stompClient.current.send(
                    `/pub/${roomId}/stockDetail`,
                    {},
                    JSON.stringify({
                        player: nowPlayer + 1,
                        stockId: stockIds[nowPlayerPosition],
                    })
                );
            }
        }
        // 금거래소 방문
        else if (nowPlayerPosition === 30) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/selectGolds`, {}, JSON.stringify({ player: nowPlayer + 1 }));
            }
        }
        // 은행 방문
        else if ([2, 10, 18].includes(nowPlayerPosition)) {
            if (stompClient.current) {
                stompClient.current.send(
                    `/pub/${roomId}/bank`,
                    {},
                    JSON.stringify({
                        player: nowPlayer + 1,
                        bankId: bankIds[nowPlayerPosition],
                    })
                );
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
    }, [isModalOpen]);

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
                stompClient.current.send(
                    `/pub/${roomId}/buyBuilding`,
                    {},
                    JSON.stringify({
                        player: nowPlayer + 1,
                        buildingId: buildingIds[nowPlayerPosition],
                    })
                );
                setTradeRealEstate([false, false]);
            }
        } else if (tradeRealEstate[1]) {
            if (stompClient.current) {
                stompClient.current.send(
                    `/pub/${roomId}/sellBuilding`,
                    {},
                    JSON.stringify({
                        player: nowPlayer + 1,
                        buildingId: buildingIds[nowPlayerPosition],
                    })
                );
                setTradeRealEstate([false, false]);
            }
        }
    }, [tradeRealEstate]);

    // 주식 거래
    useEffect(() => {
        if (tradeStock[0]) {
            if (stompClient.current) {
                stompClient.current.send(
                    `/pub/${roomId}/buyStock`,
                    {},
                    JSON.stringify({
                        player: nowPlayer + 1,
                        stockId: stockIds[nowPlayerPosition],
                        stockAmount: buyAmount,
                    })
                );
                setTradeStock([false, false]);
            }
        } else if (tradeStock[1]) {
            if (stompClient.current) {
                stompClient.current.send(
                    `/pub/${roomId}/sellStock`,
                    {},
                    JSON.stringify({
                        player: nowPlayer + 1,
                        stockId: stockIds[nowPlayerPosition],
                        stockAmount: sellAmount,
                    })
                );
                setTradeStock([false, false]);
            }
        }
    }, [tradeStock]);

    // 금 거래
    useEffect(() => {
        if (tradeGold[0]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/buyGolds`, {}, JSON.stringify({ player: nowPlayer + 1, goldAmount: buyAmount }));
                setTradeGold([false, false]);
            }
        } else if (tradeGold[1]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/sellGolds`, {}, JSON.stringify({ player: nowPlayer + 1, goldAmount: sellAmount }));
                setTradeGold([false, false]);
            }
        }
    }, [tradeGold]);

    // 은행 거래
    useEffect(() => {
        if (tradeBank[0]) {
            if (stompClient.current) {
                stompClient.current.send(
                    `/pub/${roomId}/joinSavings`,
                    {},
                    JSON.stringify({
                        player: nowPlayer + 1,
                        bankId: bankIds[nowPlayerPosition],
                    })
                );
                setTradeBank([false, false]);
            }
        } else if (tradeBank[1]) {
            if (stompClient.current) {
                stompClient.current.send(
                    `/pub/${roomId}/stopSavings`,
                    {},
                    JSON.stringify({
                        player: nowPlayer + 1,
                        bankId: bankIds[nowPlayerPosition],
                    })
                );
                setTradeBank([false, false]);
            }
        }
    }, [tradeBank]);

    // 보험 거래
    useEffect(() => {
        if (tradeInsurance[0]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({ player: nowPlayer + 1, insuranceId: 1 }));
                setTradeInsurance([false, false, false, false]);
            }
        }
        if (tradeInsurance[1]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({ player: nowPlayer + 1, insuranceId: 2 }));
                setTradeInsurance([false, false, false, false]);
            }
        }
        if (tradeInsurance[2]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({ player: nowPlayer + 1, insuranceId: 3 }));
                setTradeInsurance([false, false, false, false]);
            }
        }
        if (tradeInsurance[3]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({ player: nowPlayer + 1, insuranceId: 4 }));
                setTradeInsurance([false, false, false, false]);
            }
        }
    }, [tradeInsurance]);

    //턴 종료
    useEffect(() => {
        if (!callBack) return;
        if (stompClient.current) {
            stompClient.current.send(`/pub/${roomId}/finishTurn`, {}, {});
            setCallBack(false);
            setIsModalOpen(false);
        }
    }, [callBack]);

    // 방 입장 시
    useEffect(() => {
        if (roomJoin == 0) return;
        if (stompClient.current) {
            // 두 번째 : 헤더 / 세 번째 : 보낼 데이터
            stompClient.current.send(`/pub/${roomId}/join`, {}, JSON.stringify({ player: playername, nickname: nickname }));

            // 요청 완료했으면 다시 fefault로 변경
            setRoomJoin(0);
        }
    }, [roomJoin]);

    return <></>;
}

export default PlayerSocket;
