import React, {useEffect, useRef, useState} from 'react';
import sockjs from 'sockjs-client/dist/sockjs';
import {Stomp} from '@stomp/stompjs';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
    CallBackState,
    IsModalOpenState,
    MonthlyModalOpenState,
    MovementCardsState,
    NowPlayerPositionState,
    NowPlayerState,
    RoomIdState,
    RoomJoinState,
    RoomJoinUsersNicknameState,
    UseridState,
} from './recoil/animation/atom';
import {
    BuyAmountState,
    GetPredictionState,
    GoldDetailState,
    SellAmountState,
    StockDetailState,
    TradeBankState,
    TradeGoldState,
    TradeInsuranceConfirmState,
    TradeInsuranceState,
    TradeRealEstateState,
    TradeStockState,
} from './recoil/trading/atom';
import {PortfolioState, PredictionState, StockState} from '/src/recoil/game/atom.tsx';
import {
    BankInfoState,
    ChanceCardInfoState,
    InsuranceInfoState,
    MonthlyInfoState,
    RealEstateInfoState,
    StockInfoState
} from './recoil/modalInfo/atom';

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
    const [tradeInsuranceConfirm, setTradeInsuranceConfirm] = useRecoilState(TradeInsuranceConfirmState); // 보험 확인 버튼
    const [insuranceCnt, setInsuranceCnt] = useState(0); // 보험 응답 카운트

    // 매수량, 매도량
    const [buyAmount, setbuyAmount] = useRecoilState(BuyAmountState);
    const [sellAmount, setSellAmount] = useRecoilState(SellAmountState);

    const setStockDetail = useSetRecoilState(StockDetailState);
    const setGoldDetail = useSetRecoilState(GoldDetailState);
    const setPortfolio = useSetRecoilState(PortfolioState);
    const setStocks = useSetRecoilState(StockState);
    const setPrediction = useSetRecoilState(PredictionState);
    const getPrediction = useRecoilValue(GetPredictionState);

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

    // let unicastSubscribe;
    // let broadCastSubscribe;

    function uniCastCallBackFunction(recievedMessage: any) {
        const message = JSON.parse(recievedMessage.body) || null; // 객체
        const type = recievedMessage.headers.type || null; // 문자열
        console.log('개인메시지 type: ', type);
        console.log('개인메시지 message: ', message);
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
        } else if (type === 'selectGolds') {
            setGoldDetail({
                player: message.player,
                price: message.price,
                rate: message.rate,
                priceHistory: message.priceHistory,
                rateHistory: message.rateHistory,
            });
        } else if (type === 'oracle') {
            setPrediction(message);
        }
        // 턴 종료 로직
        else if (type === 'buyStock') {
            setCallBack(true);
        } else if (type === 'sellStock') {
            setCallBack(true);
        } else if (type === 'buyGolds') {
            setCallBack(true);
        } else if (type === 'sellGolds') {
            setCallBack(true);
        } else if (type === 'buyBuilding') {
            setCallBack(true);
        } else if (type === 'sellBuilding') {
            setCallBack(true);
        } else if (type === 'joinSavings') {
            setCallBack(true);
        } else if (type === 'stopSavings') {
            setCallBack(true);
        } else if (type in ['joinInsurance', 'finishInsurance']) {
            if (insuranceCnt === 3) {
                setCallBack(true);
                setInsuranceCnt(0);
            } else {
                setInsuranceCnt(prev => prev + 1);
            }
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
    }

    function personalCallBackFunction(recievedMessage: any) {
        const message = JSON.parse(recievedMessage.body);
        console.log('전체메시지', message);
        if (message.code == '') {
            console.log('정상');
        } else if (message.code == 1000) {
            alert('해당 번호는 없는 방입니다.');
        }
        // 이미 들어간 방인 경우
        else if (message.code == 1006) {
            alert('이미 있는 접속한 방에 다시 접속.');
        }
    }

    function broadCastCallBackFunction(recievedMessage: any) {
        const message = JSON.parse(recievedMessage.body);
        const type = recievedMessage.headers.type || null;
        console.log('전체메시지 type: ', type);
        console.log('전체메시지 message: ', message);
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
                insurance1: message.insuranceDto[1],
                insurance2: message.insuranceDto[2],
                insurance3: message.insuranceDto[3],
                insurance4: message.insuranceDto[4],
            });
            setTradeInsurance([message.have[3], message.have[4], message.have[1], message.have[2]]);
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

            if (nick1 == undefined) nick1 = 'wait..';
            if (nick2 == undefined) nick2 = 'wait..';
            if (nick3 == undefined) nick3 = 'wait..';
            if (nick4 == undefined) nick4 = 'wait..';

            setRoomJoinUsersNickname([nick1, nick2, nick3, nick4]);
            console.log(roomJoinUsersNickname);
        }
    }

    useEffect(() => {
        setRoomId(1);
    }, []);

    useEffect(() => {
        console.log('roomId: ' + roomId);

        // stompClient.current가 null인지 확인, stompClient가 connected 상태인지 확인
        if (!stompClient.current || !stompClient.current.connected) {
            stompClient.current = Stomp.over(() => new sockjs('https://j9b109.p.ssafy.io/ws'));
            stompClient.current.connect(
                {},
                function () {
                    stompClient.current.subscribe(`/sub/player/${playername}`, personalCallBackFunction);
                    stompClient.current.subscribe(`/sub/${roomId}`, broadCastCallBackFunction);
                    stompClient.current.subscribe(`/sub/${roomId}/${playername}`, uniCastCallBackFunction);
                    console.log(roomId + '번 방 구독 완료');
                },
                function () {
                    console.log(roomId + '번 방 구독 실패');
                }
            );
        } else {
            stompClient.current.unsubscribe();
            stompClient.current.subscribe(`/sub/${roomId}`, broadCastCallBackFunction);
            stompClient.current.subscribe(`/sub/${roomId}/${playername}`, uniCastCallBackFunction);
            console.log(`기존 방 구독 취소 후 ${roomId}번 방 구독 완료`);
        }
    }, [roomId, playername, stompClient]);

    useEffect(() => {
        console.log('hello');

        console.log(roomJoinUsersNickname);
    }, [roomJoinUsersNickname]);

    // 자산별 방문
    useEffect(() => {
        if (!isModalOpen) return;

        // 부동산 방문
        if ([4, 14, 22].includes(nowPlayerPosition)) {
            console.log(nowPlayer + 1, buildingIds[nowPlayerPosition]);
            // isOpen 상태가 true일 때 메시지를 보내는 코드를 추가
            if (stompClient.current) {
                stompClient.current.send(
                    `/pub/${roomId}/visitBuilding`,
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
                stompClient.current.send(`/pub/${roomId}/selectGolds`, {}, JSON.stringify({player: nowPlayer + 1}));
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
                stompClient.current.send(`/pub/${roomId}/insurance`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    insuranceId: ''
                }));
            }
        }
        // 찬스 카드 방문
        else if ([12, 20, 28].includes(nowPlayerPosition)) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/eventCard`, {}, JSON.stringify({player: nowPlayer + 1}));
            }
        }
    }, [isModalOpen]);

    // 월말정산
    useEffect(() => {
        if (!monthlyModalOpen) return;
        // 출발점 통과
        if (stompClient.current) {
            stompClient.current.send(`/pub/${roomId}/calculate`, {}, JSON.stringify({player: nowPlayer + 1}));
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
                setCallBack(true);
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
                setCallBack(true);
            }
        }
    }, [tradeStock]);

    // 금 거래
    useEffect(() => {
        if (tradeGold[0]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/buyGolds`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    goldAmount: buyAmount
                }));
                setTradeGold([false, false]);
            }
        } else if (tradeGold[1]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/sellGolds`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    goldAmount: sellAmount
                }));
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
        if (!tradeInsuranceConfirm) return;

        // if 가입 else 해지
        if (tradeInsurance[0]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    insuranceId: 1
                }));
            }
        } else {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/finishInsurance`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    insuranceId: 1
                }));
            }
        }
        if (tradeInsurance[1]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    insuranceId: 2
                }));
            }
        } else {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/finishInsurance`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    insuranceId: 2
                }));
            }
        }
        if (tradeInsurance[2]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    insuranceId: 3
                }));
            }
        } else {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/finishInsurance`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    insuranceId: 3
                }));
            }
        }
        if (tradeInsurance[3]) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    insuranceId: 4
                }));
            }
        } else {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/finishInsurance`, {}, JSON.stringify({
                    player: nowPlayer + 1,
                    insuranceId: 4
                }));
            }
        }
        setTradeInsuranceConfirm(false);
    }, [tradeInsuranceConfirm]);

    //예언소
    useEffect(() => {
        if (getPrediction) {
            if (stompClient.current) {
                stompClient.current.send(`/pub/${roomId}/oracle`, {}, JSON.stringify({player: nowPlayer + 1}));
            }
        }
    }, [getPrediction]);
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
            stompClient.current.send(`/pub/${roomId}/join`, {}, JSON.stringify({
                player: playername,
                nickname: nickname
            }));

            // 요청 완료했으면 다시 fefault로 변경
            setRoomJoin(0);
        }
    }, [roomJoin]);

    return <></>;
}

export default PlayerSocket;
