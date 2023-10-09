import './App.css';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, SpotLight, useHelper } from '@react-three/drei';
import video2 from '/video/video_loading.mp4'; // sound
import * as S from './App.style';

import Map from '/src/Map';
import Characters from '/src/Characters';

// import Portforlio from "./Components/Common/Portfolio";
import NewsBar from './Components/Common/NewsBar';

import './App.css';
import Modals from './Modals';
import PlayerPlaceAll from './Components/Common/PlayerPlaceAll';
import SideBar from './Components/Common/SideBar';

import Socket from './Socket';
import * as THREE from 'three';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    PlayerIdState,
    PlayerToRollState,
    PortfolioState,
    StockState,
    GoldState,
    interestRateState,
    buildingState,
    currentPrevIssueState,
    currentIssueState,
    StockChangeArrState,
    PlayerRankingState,
} from '/src/recoil/game/atom';

import { RoomJoinUsersCharacterState, MyTurnState, PlayerSequenceState, MovementCardRequestState } from '/src/recoil/animation/atom';

import axios from 'axios';
import { RoomIdState } from '/src/recoil/animation/atom.tsx';
import CoinEffect from '/src/Components/Effect/CoinEffect';
import Round from '/src/Components/Modals/Round.tsx';
import MovementCard from './Components/Modals/MovementCard';

import BigEventRound from './Components/Modals/BigEventRound';
import GameEnd from '/src/Components/Modals/GameEnd.tsx';
import StartPlayCheck from './Components/Modals/StartPlayCheck';

function App() {
    const light = useRef();
    const [movementCardRequest, setMovementCardRequest] = useRecoilState(MovementCardRequestState);

    //   useHelper(light, THREE.DirectionalLightHelper);

    const [Portfolio, setPortfolioState] = useRecoilState(PortfolioState);
    const setStockState = useSetRecoilState(StockState);
    const [roomId, setRoomId] = useRecoilState(RoomIdState);
    const [, setPlayerId] = useRecoilState(PlayerIdState);
    const setGoldState = useSetRecoilState(GoldState);
    const setInterestRateState = useSetRecoilState(interestRateState);
    const setBuildingState = useSetRecoilState(buildingState);
    const setPlayerToRoll = useSetRecoilState(PlayerToRollState);
    const setCurrentPrevIssues = useSetRecoilState(currentPrevIssueState);
    const setCurrentIssue = useSetRecoilState(currentIssueState);
    const setStockChangeArr = useSetRecoilState(StockChangeArrState);
    const [roomJoinUsersCharacter, setRoomJoinUsersCharacter] = useRecoilState(RoomJoinUsersCharacterState);
    const setPlayerRanking = useSetRecoilState(PlayerRankingState);
    const setPlayerSequence = useSetRecoilState(PlayerSequenceState);

    function objectToArray(obj) {
        if (obj === null) {
            return;
        }
        if (!obj) {
            return [];
        }
        return Object.values(obj);
    }

    const CharacterArr = objectToArray(roomJoinUsersCharacter);

    setPlayerId(Number(localStorage.getItem('player')));

    // SSH Test
    const [showVideo, setShowVideo] = useState(true);
    const [, setMyTurn] = useRecoilState(MyTurnState);

    useEffect(() => {
        axios.get(`https://j9b109.p.ssafy.io/api/room/${roomId}/start`).then(data => {
            console.log(data.data.playerSequence);
            console.log(data.data.currentPlayerToRoll);
            setPortfolioState(data.data.portfolios);
            setStockState(data.data.stocks);
            setGoldState(data.data.gold);
            setInterestRateState(data.data.interestRate);
            setBuildingState(data.data.buildings);
            setPlayerToRoll(data.data.currentPlayerToRoll);
            setRoomId(data.data.roomId);
            setCurrentPrevIssues(data.data.currentPrevIssues);
            setCurrentIssue(data.data.currentIssue);
            setStockChangeArr(data.data.stocks);
            setRoomJoinUsersCharacter(data.data.characters);
            setPlayerRanking(data.data.players);
            setPlayerSequence(data.data.playerSequence);
            // 내 턴을 저장
            for (let i = 0; i < data.data.playerSequence.length; i++) {
                if (data.data.playerSequence == Number(localStorage.getItem('player'))) {
                    setMyTurn(i + 1);
                }
            }
            console.log(data.data);
            setMovementCardRequest(true);
        });
    }, []);

    // r3f 객체 렌더링 확인 코드
    const objectsToRender = 1;
    const [renderedObjectsCount, setRenderedObjectsCount] = useState(0);
    useEffect(() => {
        console.log('========================');
        console.log(renderedObjectsCount);
        if (renderedObjectsCount === objectsToRender) {
            console.log('모든 객체가 렌더링되었습니다.');
            setShowVideo(false);
        }
    }, [renderedObjectsCount]);

    return (
        <S.Rooter>
            {showVideo && (
                <div className='video-loading'>
                    <video autoPlay muted loop src='/video/video_loading.mp4' style={{ width: '100%', height: 'auto' }} />
                </div>
            )}
            <div className='canvas-outer' style={{ width: '100%', height: 'calc(100vw * 9 / 16)' }}>
                <Canvas style={{ width: '100%', height: '100%' }} onCreated={() => setRenderedObjectsCount(1)}>
                    <OrthographicCamera makeDefault zoom={64} position={[4, 3.9, 4]} />
                    <OrbitControls />
                    <ambientLight intensity={1} />
                    <directionalLight ref={light} color={0xffffff} intensity={3} position={[0, 5, 0]} />
                    <pointLight ref={light} color={0xffffff} intensity={1} position={[0, 5, 0]} />

                    <Map />
                    {roomJoinUsersCharacter === null ? null : <Characters CharacterArr={CharacterArr} />}
                </Canvas>

                <NewsBar />
                {roomJoinUsersCharacter === null ? null : <PlayerPlaceAll />}
                {Portfolio === null ? null : <SideBar />}
                {PlayerSequenceState === null ? null : <StartPlayCheck />}

                <Modals />
                <Socket />
                <CoinEffect />
                <MovementCard />
                <BigEventRound />
                <Round />
                <GameEnd />
            </div>
        </S.Rooter>
    );
}

export default App;
