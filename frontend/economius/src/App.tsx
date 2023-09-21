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
import Gold from "./Components/Modals/Gold";
import Portforlio from "./Components/Common/Portfolio";
import NewsBar from "./Components/Common/NewsBar";
import PlayerPlace from "./Components/Common/PlayerPlace";

function App() {
  Modal.setAppElement("#root");

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
      <Gold />
      <Portforlio />
      <NewsBar />
      <PlayerPlace
        borderRadius="0px 0px 100px 0px"
        top="6%"
        left="0%"
        bgColor="rgba(255, 216, 133, 0.9)"
      />
      <PlayerPlace
        borderRadius="0px 0px 0px 100px"
        top="6%"
        left="50%"
        bgColor="rgba(131, 213, 233, 0.9)"
      />
      <PlayerPlace
        borderRadius="0px 100px 0px 0px"
        top="81%"
        left="0%"
        bgColor="rgba(255, 166, 132, 0.90)"
      />

      <PlayerPlace
        borderRadius="100px 0px 0px 0px"
        top="81%"
        left="50%"
        bgColor="rgba(255, 156, 159, 0.90)"
      />
    </div>
  );
}

export default App;
