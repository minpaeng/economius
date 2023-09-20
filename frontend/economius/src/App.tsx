<<<<<<< HEAD
import './App.css';
import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import Map from '/src/Map';
import Characters from '/src/Characters';
import Dice from './Dice';
import Controller from '/src/Controller';
import Modal from 'react-modal';
import BigEvent from '../src/Components/Modals/BigEvent';
import ChanceCard from '../src/Components/Modals/ChanceCard';
import InstallmentSaving from './Components/Modals/InstallmentSaving';
import MonthlyCalculate from './Components/Modals/MonthlyCalculate';
=======
import "./App.css";
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Map from "/src/Map";
import Characters from "/src/Characters";
import Dice from "./Dice";
import Controller from "/src/Controller";
import Modal from "react-modal";
import BigEvent from "../src/Components/Modals/BigEvent";
import ChanceCard from "../src/Components/Modals/ChanceCard";
import InstallmentSaving from "./Components/Modals/InstallmentSaving";
import Insurance from "./Components/Modals/Insurance";
import Stock from "./Components/Modals/Stock";
>>>>>>> ad503b3d903fffe7443306a67b6d17ff75b4dfa8

function App() {
  Modal.setAppElement("#root");

<<<<<<< HEAD
    return (
        <div className='canvas-outer' style={{ width: '100%', height: 'calc(100vw * 9 / 16)' }}>
            {/* <Canvas style={{ width: '100%', height: '100%' }}>
                <OrthographicCamera makeDefault zoom={65} position={[4, 4.1, 4]} />
                <OrbitControls />
                <ambientLight intensity={3} />
                <Map />
                <Characters />
                <Dice />
            </Canvas> */}

            <Controller />
            {/* Modal Test */}
            <BigEvent />
            <ChanceCard />
            <InstallmentSaving />
            <MonthlyCalculate />
        </div>
    );
=======
  return (
    <div
      className="canvas-outer"
      style={{ width: "100%", height: "calc(100vw * 9 / 16)" }}
    >
      <Canvas style={{ width: "100%", height: "100%" }}>
        <OrthographicCamera makeDefault zoom={65} position={[4, 4.1, 4]} />
        <OrbitControls />
        <ambientLight intensity={3} />
        <Map />
        <Characters />
        <Dice />
      </Canvas>

      <Controller />
      {/* Modal Test */}
      <BigEvent />
      <ChanceCard />
      <InstallmentSaving />
      <Insurance />
      <Stock />
    </div>
  );
>>>>>>> ad503b3d903fffe7443306a67b6d17ff75b4dfa8
}

export default App;
