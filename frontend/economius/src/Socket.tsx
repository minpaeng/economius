import React, { useEffect, useRef, useState } from 'react';
import sockjs from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    CallBackState,
    GameButtonState,
    IsModalOpenState,
    MonthlyModalOpenState,
    MovementCardOpenState,
    MovementCardState,
    NowPlayerPositionState,
    RoomCountState,
    RoomExitState,
    RoomHostState,
    RoomIdState,
    RoomJoinState,
    RoomJoinUsersIdState,
    RoomJoinUsersNicknameState,
    SetShowWaitRoomState,
    StartReturnState,
    UseridState,
    IsMovingState,
    MoveDistState,
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
import {
    GameRoundState,
    PlayerIdState,
    PlayerRankingState,
    PlayerToRollState,
    PortfolioState,
    PredictionState,
    StockState,
    currentPrevIssueState,
    currentIssueState,
    StockChangeArrState,
} from '/src/recoil/game/atom.tsx';
import {
    BankInfoState,
    ChanceCardInfoState,
    InsuranceInfoState,
    MonthlyInfoState,
    RealEstateInfoState,
    StockInfoState,
    BigEventInfoState,
    FinanceCenterState,
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
    const [nowPlayerPosition, setNowPlayerPosition] = useRecoilState(NowPlayerPositionState);
    const [movementCard, setMovementCard] = useRecoilState(MovementCardState);
    const [movementCardOpen, setMovementCardOpen] = useRecoilState(MovementCardOpenState);
    const [monthlyModalOpen, setMonthlyModalOpen] = useRecoilState(MonthlyModalOpenState);
    const [isMoving, setIsMoving] = useRecoilState(IsMovingState);
    const [financeCenter, setFinanceCenter] = useRecoilState(FinanceCenterState);
    const [moveDist, setMoveDist] = useRecoilState(MoveDistState);
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

    // 모달 정보 setter 함수
    const setStockDetail = useSetRecoilState(StockDetailState);
    const setGoldDetail = useSetRecoilState(GoldDetailState);
    const setPortfolio = useSetRecoilState(PortfolioState);
    const setStocks = useSetRecoilState(StockState);
    const setPrediction = useSetRecoilState(PredictionState);
    const getPrediction = useRecoilValue(GetPredictionState);
    const [playerToRoll, setPlayerToRoll] = useRecoilState(PlayerToRollState);
    const setGameRound = useSetRecoilState(GameRoundState);
    const setPlayerRanking = useSetRecoilState(PlayerRankingState);

    const [callBack, setCallBack] = useRecoilState(CallBackState);

    const setCurrentPrevIssues = useSetRecoilState(currentPrevIssueState);
    const setCurrentIssue = useSetRecoilState(currentIssueState);

    const setStockChangeArr = useSetRecoilState(StockChangeArrState);

    //이벤트 카드
    const [chanceCardInfo, setChanceCardInfo] = useRecoilState(ChanceCardInfoState);

    // 대이벤트 정보
    const [bigEventInfo, setBigEventInfo] = useRecoilState(BigEventInfoState);

    // 방 연결을 위한 recoil
    const [userId, setUserId] = useRecoilState(UseridState);
    const [roomId, setRoomId] = useRecoilState(RoomIdState);
    const [roomJoin, setRoomJoin] = useRecoilState(RoomJoinState);
    const [roomJoinUsersNickname, setRoomJoinUsersNickname] = useRecoilState(RoomJoinUsersNicknameState);
    const nickname = localStorage.getItem('nickname');
    const [playerId] = useRecoilState(PlayerIdState);
    const [showWaitRoom, setShowWaitRoom] = useRecoilState(SetShowWaitRoomState);

    const [roomHost, setRoomHost] = useRecoilState(RoomHostState);
    const [roomCount, setRoomCount] = useRecoilState(RoomCountState);

    const [roomExit, setRoomExit] = useRecoilState(RoomExitState);
    const [gameButton, setGameButton] = useRecoilState(GameButtonState);
    const [startReturn, setStartReturn] = useRecoilState(StartReturnState);
    const [roomJoinUsersId, setRoomJoinUsersId] = useRecoilState(RoomJoinUsersIdState);

    const stompClient = useRef(null);

    // let unicastSubscribe;
    // let broadCastSubscribe;

    function uniCastCallBackFunction(recievedMessage: any) {
        const message = JSON.parse(recievedMessage.body) || null; // 객체
        const type = recievedMessage.headers.type || null; // 문자열
        console.log('개인메시지 type: ', type);
        console.log('개인메시지 message: ', message);
        // 주식 변경 recoil 시작
        if (type === 'selectGolds') {
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
    }

    function personalCallBackFunction(recievedMessage: any) {
        const message = JSON.parse(recievedMessage.body);
        const header = JSON.parse(recievedMessage.headers.success);
        console.log('민정이가 부른 헤더');
        console.log(header);

        console.log('전체메시지', message);

        // if (message.code == '') {
        //     console.log('정상~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        //     setUserNicknames(message);
        //     setShowWaitRoom(true);
        //     setRoomHost(message.hostPlayer);
        //     setRoomCount(message.players.length);
        // } else

        if (message.code == 1000) {
            setRoomJoin(0);
            setShowWaitRoom(false);
            setRoomHost(0);
            setRoomCount(0);

            alert('해당 번호는 없는 방입니다.');
        }
        // 이미 들어간 방인 경우
        else if (message.code == 1006) {
            setUserNicknames(message);
            setShowWaitRoom(true);
            setRoomHost(message.hostPlayer);
            setRoomCount(message.players.length);

            // alert('이미 있는 접속한 방에 다시 접속.');
        }
    }

    function broadCastCallBackFunction(recievedMessage: any) {
        console.log('여기 뜬다요?');

        const message = JSON.parse(recievedMessage.body);
        const type = recievedMessage.headers.type || null;
        console.log('전체메시지 type: ', type);
        console.log('전체메시지 message: ', message);
        if (type === 'movePlayer') {
            setMoveDist(message.movementCount);
            setPlayerToRoll(message.player);
            setTimeout(() => {
                setIsMoving(true);
                setMovementCardOpen(false);
            }, 500);
        } else if (type === 'finishTurn') {
            setStocks(message.stocks);
            setPortfolio(message.portfolios);
            setPlayerToRoll(message.currentPlayerToRoll);
            setCurrentPrevIssues(message.currentPrevIssues);
            setCurrentIssue(message.currentIssue);
            setStockChangeArr(message.stocks);
            setGameRound(Math.floor(message.gameTurn / 4));
            setCallBack(false);
            setIsModalOpen(false);
            if (message.currentPlayerToRoll === playerId) {
                connect().then(function () {
                    stompClient.current.send(`/pub/${roomId}/viewMovementCard`, {}, JSON.stringify({ player: playerToRoll }));
                });
            }
            // } else if (type === 'viewMovementCard' && message.player === playerId) {
        } else if (type === 'viewMovementCard') {
            setMovementCard(message.cards);
            setMovementCardOpen(true);
            setPlayerRanking(message.players);
            // else if (type === 'movePlayer' && message.player === playerId) {
            //     setNowPlayerPosition(message.location);
            // }
        } else if (type === 'buyStock') {
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
        if (type === 'issue') {
            setBigEventInfo({
                buildingChange: message.buildingChange,
                country: message.country,
                description: message.description,
                goldChange: message.goldChange,
                interestRateChange: message.interestRateChange,
                name: message.name,
                stockChanges: message.stockChanges,
                type: message.type,
                url: message.url,
                year: message.year,
            });
        }
        if (type == 'visitBuilding') {
            setRealEstateInfo({
                buildingId: message.buildingId,
                buildingPrice: message.buildingPrice,
                changeAmount: message.changeAmount,
                visitor: message.visitor,
                owner: message.owner,
            });
        } else if (type === 'stockDetail') {
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
            console.log('calculate');
            console.log(message);
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
            setUserNicknames(message);
            setShowWaitRoom(true);
            setRoomHost(message.hostPlayer);
            setRoomCount(message.players.length);
        } else if (type == 'exit') {
            setUserNicknames(message);
            console.log(roomJoinUsersNickname);
        }
        // 게임 시작 pub에 대한 결과를 반환 받으면
        else if (type == 'start') {
            setStartReturn(true);
            // 플레이어 이동 카드 조회
            if (playerToRoll === playerId) {
                connect().then(function () {
                    stompClient.current.send(`/pub/${roomId}/viewMovementCard`, {}, JSON.stringify({ player: playerToRoll }));
                });
            }
        }
    }

    function setUserNicknames(message) {
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
        setRoomJoinUsersId([player1, player2, player3, player4]);
    }

    // useEffect(() => {
    //     setRoomId(1);
    // }, []);

    useEffect(() => {
        console.log(`roomId ${roomId}로 연결`);

        connect().then(function () {
            // 구독 정보가 바뀌었다면 재구독
            if (roomId != 0 && stompClient.current.connected) {
                stompClient.current.unsubscribe();
                stompClient.current.subscribe(`/sub/player/${playerId}`, personalCallBackFunction);
                stompClient.current.subscribe(`/sub/${roomId}`, broadCastCallBackFunction);
                stompClient.current.subscribe(`/sub/${roomId}/${playerId}`, uniCastCallBackFunction);
                console.log(`기존 방 구독 취소 후 ${roomId}번 방 구독 완료`);
            }
        });
    }, [roomId, playerId]);

    async function connect() {
        // stompClient가 close 상태라면 재생성 후 connect
        if (!stompClient.current || !stompClient.current.connected) {
            console.log('재연결중');
            stompClient.current = Stomp.over(() => new sockjs('https://j9b109.p.ssafy.io/ws'));
            return await new Promise<void>((resolve, reject) => {
                stompClient.current.connect(
                    {},
                    function () {
                        stompClient.current.subscribe(`/sub/player/${playerId}`, personalCallBackFunction);
                        stompClient.current.subscribe(`/sub/${roomId}`, broadCastCallBackFunction);
                        stompClient.current.subscribe(`/sub/${roomId}/${playerId}`, uniCastCallBackFunction);
                        console.log(roomId + '번 방 구독 완료');
                        console.log('재연결 완료');
                        resolve(); // 연결 성공 시 resolve 호출
                    },
                    function () {
                        console.log(roomId + '번 방 구독 실패');
                        reject(); // 연결 실패 시 reject 호출
                    }
                );
                console.log('재연결 완료');
            });
        }
    }

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
            connect().then(function () {
                stompClient.current.send(
                    `/pub/${roomId}/visitBuilding`,
                    {},
                    JSON.stringify({
                        player: playerToRoll,
                        buildingId: buildingIds[nowPlayerPosition],
                    })
                );
                // 0번째 player를 서버에 1로 보내줘야 해서
            });
        }
        //주식 방문
        else if (nowPlayerPosition % 2 === 1) {
            if (playerToRoll === playerId) {
                connect().then(function () {
                    stompClient.current.send(`/pub/${roomId}/buyItem`, {}, JSON.stringify({ player: playerToRoll, stockId: stockIds[nowPlayerPosition] }));
                    stompClient.current.send(`/pub/${roomId}/stockDetail`, {}, JSON.stringify({ player: playerToRoll, stockId: stockIds[nowPlayerPosition] }));
                });
            }
        }
        // 금거래소 방문
        else if (nowPlayerPosition === 30) {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/selectGolds`, {}, JSON.stringify({ player: playerToRoll }));
            });
        }
        // 은행 방문
        else if ([2, 10, 18].includes(nowPlayerPosition)) {
            connect().then(function () {
                stompClient.current.send(
                    `/pub/${roomId}/bank`,
                    {},
                    JSON.stringify({
                        player: playerToRoll,
                        bankId: bankIds[nowPlayerPosition],
                    })
                );
            });
        }
        // 보험 방문
        else if ([6, 26].includes(nowPlayerPosition)) {
            connect().then(function () {
                stompClient.current.send(
                    `/pub/${roomId}/insurance`,
                    {},
                    JSON.stringify({
                        player: playerToRoll,
                        insuranceId: '',
                    })
                );
            });
        }
        // 찬스 카드 방문
        else if ([12, 20, 28].includes(nowPlayerPosition)) {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/eventCard`, {}, JSON.stringify({ player: playerToRoll }));
            });
        }
    }, [isModalOpen]);

    // 월말정산
    useEffect(() => {
        if (!monthlyModalOpen) return;
        // 출발점 통과
        connect().then(function () {
            stompClient.current.send(`/pub/${roomId}/calculate`, {}, JSON.stringify({ player: playerToRoll }));
        });
    }, [monthlyModalOpen]);

    // 종합금융센터
    useEffect(() => {
        // 현재 플레이어의 위치를 바꾸고, 바뀌고 나면 모달을 엶
        if (financeCenter === -1) return;
        setNowPlayerPosition(financeCenter);
        if (nowPlayerPosition === financeCenter) {
            setIsModalOpen(true);
            setFinanceCenter(-1);
        }
    }, [financeCenter, nowPlayerPosition]);

    // 부동산 거래
    useEffect(() => {
        if (tradeRealEstate[0]) {
            connect().then(function () {
                stompClient.current.send(
                    `/pub/${roomId}/buyBuilding`,
                    {},
                    JSON.stringify({
                        player: playerToRoll,
                        buildingId: buildingIds[nowPlayerPosition],
                    })
                );
                setTradeRealEstate([false, false]);
            });
        } else if (tradeRealEstate[1]) {
            connect().then(function () {
                stompClient.current.send(
                    `/pub/${roomId}/sellBuilding`,
                    {},
                    JSON.stringify({
                        player: playerToRoll,
                        buildingId: buildingIds[nowPlayerPosition],
                    })
                );
                setTradeRealEstate([false, false]);
            });
        }
    }, [tradeRealEstate]);

    // 주식 거래
    useEffect(() => {
        if (tradeStock[0]) {
            connect().then(function () {
                stompClient.current.send(
                    `/pub/${roomId}/buyStock`,
                    {},
                    JSON.stringify({
                        player: playerToRoll,
                        stockId: stockIds[nowPlayerPosition],
                        stockAmount: buyAmount,
                    })
                );
                setTradeStock([false, false]);
            });
        } else if (tradeStock[1]) {
            connect().then(function () {
                stompClient.current.send(
                    `/pub/${roomId}/sellStock`,
                    {},
                    JSON.stringify({
                        player: playerToRoll,
                        stockId: stockIds[nowPlayerPosition],
                        stockAmount: sellAmount,
                    })
                );
                setTradeStock([false, false]);
            });
        }
    }, [tradeStock]);

    // 금 거래
    useEffect(() => {
        if (tradeGold[0]) {
            connect().then(function () {
                stompClient.current.send(
                    `/pub/${roomId}/buyGolds`,
                    {},
                    JSON.stringify({
                        player: playerToRoll,
                        goldAmount: buyAmount,
                    })
                );
                setTradeGold([false, false]);
            });
        } else if (tradeGold[1]) {
            connect().then(function () {
                stompClient.current.send(
                    `/pub/${roomId}/sellGolds`,
                    {},
                    JSON.stringify({
                        player: playerToRoll,
                        goldAmount: sellAmount,
                    })
                );
                setTradeGold([false, false]);
            });
        }
    }, [tradeGold]);

    // 은행 거래
    useEffect(() => {
        if (tradeBank[0]) {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/joinSavings`, {}, JSON.stringify({ player: playerToRoll, bankId: bankIds[nowPlayerPosition] }));
                setTradeBank([false, false]);
            });
        } else if (tradeBank[1]) {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/stopSavings`, {}, JSON.stringify({ player: playerToRoll, bankId: bankIds[nowPlayerPosition] }));
                setTradeBank([false, false]);
            });
        }
    }, [tradeBank]);

    // 보험 거래
    useEffect(() => {
        if (!tradeInsuranceConfirm) return;
        // if 가입 else 해지
        if (tradeInsurance[0]) {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({ player: playerToRoll, insuranceId: 3 }));
            });
        } else {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/finishInsurance`, {}, JSON.stringify({ player: playerToRoll, insuranceId: 3 }));
            });
        }
        if (tradeInsurance[1]) {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({ player: playerToRoll, insuranceId: 4 }));
            });
        } else {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/finishInsurance`, {}, JSON.stringify({ player: playerToRoll, insuranceId: 4 }));
            });
        }
        if (tradeInsurance[2]) {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({ player: playerToRoll, insuranceId: 1 }));
            });
        } else {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/finishInsurance`, {}, JSON.stringify({ player: playerToRoll, insuranceId: 1 }));
            });
        }
        if (tradeInsurance[3]) {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/joinInsurance`, {}, JSON.stringify({ player: playerToRoll, insuranceId: 2 }));
            });
        } else {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/finishInsurance`, {}, JSON.stringify({ player: playerToRoll, insuranceId: 2 }));
            });
        }
        setTradeInsuranceConfirm(false);
    }, [tradeInsuranceConfirm]);

    //예언소
    useEffect(() => {
        if (getPrediction) {
            connect().then(function () {
                stompClient.current.send(`/pub/${roomId}/oracle`, {}, JSON.stringify({ player: playerToRoll }));
            });
        }
    }, [getPrediction]);

    // 이동하면 서버에 이동카드 정보 보내기
    useEffect(() => {
        if (!isMoving) return;
        if (playerId !== playerToRoll) return;
        connect().then(function () {
            stompClient.current.send(`/pub/${roomId}/movePlayer`, {}, JSON.stringify({ player: playerToRoll, movementCount: moveDist }));
        });
    }, [isMoving]);

    //턴 종료
    useEffect(() => {
        setCallBack(false);
        setIsModalOpen(false);
        if (callBack === false) return;
        if (playerToRoll !== playerId) return;
        connect().then(function () {
            stompClient.current.send(`/pub/${roomId}/finishTurn`, {}, {});
        });
    }, [callBack]);

    // 방 입장 시
    useEffect(() => {
        if (roomJoin == 0) return;
        connect().then(function () {
            // 두 번째 : 헤더 / 세 번째 : 보낼 데이터
            stompClient.current.send(
                `/pub/${roomId}/join`,
                {},
                JSON.stringify({
                    player: playerId,
                    nickname: nickname,
                })
            );

            console.log('Join PUB!!!!!!!!!!!!!!!!!!!!!!!!1');

            // 요청 완료했으면 다시 fefault로 변경
            setRoomJoin(0);
        });
    }, [roomJoin]);

    // 대기방 나가기 요청을 받는 경우
    useEffect(() => {
        if (roomExit === false) return;
        connect().then(function () {
            // 두 번째 : 헤더 / 세 번째 : 보낼 데이터
            stompClient.current.send(
                `/pub/${roomId}/exit`,
                {},
                JSON.stringify({
                    player: playerId,
                    nickname: nickname,
                })
            );
        });

        setRoomExit(false);
    }, [roomExit]);

    // const [gameButton, setGameButton] = useRecoilState(GameButtonState);

    // 시작 버튼 눌렀을 때 실행
    useEffect(() => {
        if (gameButton === false) return;
        connect().then(function () {
            // 두 번째 : 헤더 / 세 번째 : 보낼 데이터
            stompClient.current.send(
                `/pub/${roomId}/start`,
                {},
                JSON.stringify({
                    hostPlayer: playerId,
                })
            );
        });

        setGameButton(false);
    }, [gameButton]);

    return <></>;
}

export default PlayerSocket;
