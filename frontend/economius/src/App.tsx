import "./App.css";
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Map from "/src/Map";
import Characters from "/src/Characters";
import Dice2 from "./Dice/Dice2";
import Controller from "/src/Controller";
import Modal from "react-modal";
import Portforlio from "./Components/Common/Portfolio";
import NewsBar from "./Components/Common/NewsBar";

import "./App.css";
import Modals from "./Modals";
import PlayerPlaceAll from "./Components/Common/PlayerPlaceAll";

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
      </Canvas>

      <Dice2 />
      <Controller />

      <Portforlio />
      <NewsBar />
      <PlayerPlaceAll />

      <Modals />
    </div>
  );
}

export default App;
