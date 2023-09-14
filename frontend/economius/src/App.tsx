import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

function Map({ mapAnimation }: { mapAnimation: boolean }) {
    const mapPath = 'ani_test.gltf';
    const map = useLoader(GLTFLoader, mapPath);
    const position = [2.5, 0, 2.5];

    let mixer: any;
    useEffect(() => {
        if (map.animations.length) {
            mixer = new THREE.AnimationMixer(map.scene);

            for (let i = 0; i < map.animations.length; i++) {
                setTimeout(() => {
                    const clip = mixer.clipAction(map.animations[i]);
                    clip.setLoop(THREE.LoopOnce); // 한 번만 재생
                    clip.play();
                    clip.clampWhenFinished = true; // 클립이 재생을 완료하면 mixer에서 제거
                }, i * 2000); // 클립 번호에 따라 1초 간격으로 재생 시작
            }
        }
    }, [map, mapAnimation]);

    useFrame((_, delta) => {
        mixer?.update(delta);
    });

    map.scene.traverse((child: any) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.side = THREE.FrontSide;
        }
    });

    return (
        <Suspense fallback={null}>
            <primitive object={map.scene} position={position} />;
        </Suspense>
    );
}

function Cat({ catPosition, catRotation }: { catPosition: number[]; catRotation: number }) {
    const catPath = 'Cat.obj';
    const obj = useLoader(OBJLoader, catPath);
    const scale = [0.5, 0.5, 0.5];

    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    obj.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
            child.material = material;
        }
    });

    return (
        <Suspense fallback={null}>
            <primitive object={obj} scale={scale} position={catPosition} rotation={[0, catRotation, 0]} />
        </Suspense>
    );
}

function App() {
    const initialCatPosition = [2.2, 2, 4];
    const [catPosition, setCatPosition] = useState(initialCatPosition);
    const [catRotation, setCatRotation] = useState(Math.PI);
    const [mapAnimation, setMapAnimation] = useState(false);

    const catGoPosition = async (delta: number) => {
        // 포물선 움직임을 위한 설정
        const amplitude = 0.1; // 포물선 높이
        const frequency = 1; // 주기
        const duration = 1; // 애니메이션 지속 시간 (초)
        const steps = duration * 60; // 초당 60프레임으로 설정

        for (let i = 0; i < steps; i++) {
            const t = (i / steps) * duration;
            const yOffset = amplitude * Math.sin(2 * Math.PI * frequency * t);

            if (delta === 1) {
                setCatPosition(([x, y, z]) => [x - 2 / 60, y + yOffset, z]);
            } // left
            else if (delta === 2) {
                setCatPosition(([x, y, z]) => [x + 2 / 60, y + yOffset, z]);
            } //rigth
            else if (delta === 3) {
                setCatPosition(([x, y, z]) => [x, y + yOffset, z - 2 / 60]);
            } // go
            else {
                setCatPosition(([x, y, z]) => [x, y + yOffset, z + 2 / 60]);
            } // back

            // 1프레임마다 업데이트
            await new Promise(resolve => requestAnimationFrame(resolve));
        }
    };

    return (
        <>
            <Canvas style={{ width: '100vw', height: '100vh', background: 'linear-gradient(45deg, #8a2be2, #32cd32)' }}>
                <OrthographicCamera makeDefault zoom={35} position={[4, 8, 4]} />
                <OrbitControls />
                <ambientLight />
                <Map mapAnimation={mapAnimation} />
                <Cat catPosition={catPosition} catRotation={catRotation} />
            </Canvas>

            <div style={{ width: '5vw', height: '5vh', position: 'absolute', bottom: '5vh', left: '40vw' }}>
                <button onClick={() => catGoPosition(1)}>LEFT</button>
            </div>
            <div style={{ width: '5vw', height: '5vh', position: 'absolute', bottom: '5vh', left: '50vw' }}>
                <button onClick={() => catGoPosition(2)}>RIGHT</button>
            </div>
            <div style={{ width: '5vw', height: '5vh', position: 'absolute', bottom: '10vh', left: '45vw' }}>
                <button onClick={() => catGoPosition(3)}>GO</button>
            </div>
            <div style={{ width: '5vw', height: '5vh', position: 'absolute', bottom: '0vh', left: '45vw' }}>
                <button onClick={() => catGoPosition(4)}>BACK</button>
            </div>
            <div style={{ width: '5vw', height: '5vh', position: 'absolute', bottom: '5vh', left: '45vw' }}>
                <button onClick={() => setMapAnimation(!mapAnimation)}>Map Ani</button>
            </div>
        </>
    );
}

export default App;
