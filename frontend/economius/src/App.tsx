import './App.css';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, SpotLight, useHelper } from '@react-three/drei';

import Map from '/src/Map';
import Characters from '/src/Characters';

import Controller from '/src/Controller';

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

import { RoomJoinUsersCharacterState } from '/src/recoil/animation/atom';

import axios from 'axios';
import { RoomIdState } from '/src/recoil/animation/atom.tsx';
import CoinEffect from '/src/Components/Effect/CoinEffect';
import Round from '/src/Components/Modals/Round.tsx';
import MovementCard from './Components/Modals/MovementCard';

import BigEventRound from './Components/Modals/BigEventRound';
import GameEnd from '/src/Components/Modals/GameEnd.tsx';

function App() {
    const light = useRef();
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

    useEffect(() => {
        axios.get(`https://j9b109.p.ssafy.io/api/room/${roomId}/start`).then(data => {
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
            console.log(data.data);
        });
    }, []);

    return (
        <div className='canvas-outer' style={{ width: '100%', height: 'calc(100vw * 9 / 16)' }}>
            <Canvas style={{ width: '100%', height: '100%' }}>
                <OrthographicCamera makeDefault zoom={65} position={[4, 4.1, 4]} />
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
            <BigEventRound />

            <Modals />
            <Socket />
            <CoinEffect />
            <Round />
            <MovementCard />
            <GameEnd />
        </div>
    );
}

export default App;
