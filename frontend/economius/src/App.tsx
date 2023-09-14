import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
// import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

function Map({ mapAnimation }: { mapAnimation: boolean }) {
    const mapPath = 'test-map-m.gltf';
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
                }, i * 500); // 클립 번호에 따라 1초 간격으로 재생 시작
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

    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // 빨강으로 변경
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
    const [catPosition, setCatPosition] = useState([2, 1.5, 6]);
    const [catRotation, setCatRotation] = useState(-Math.PI / 2);
    const [catIndex, setCatIndex] = useState(0); // Cat이 서있는 칸 index
    const [mapAnimation, setMapAnimation] = useState(false);

    const animateCat = async (dist: number) => {
        // 포물선 움직임을 위한 설정
        const amplitude = 0.25; // 포물선 높이
        const frequency = 2; // 주기
        const steps = 30 * 0.5; // 초당 30프레임 / 0.5초 간

        for (let cnt = catIndex; cnt < catIndex + dist; cnt++) {
            for (let i = 0; i < steps; i++) {
                const t = i / 30; // 초당 30프레임
                const yOffset = amplitude * Math.sin(2 * Math.PI * frequency * t); // y축 포물선
                const delta = (cnt >> 3) & 3; // 8로 나눈 몫을 4로 나눈 나머지 (방향)
                // 방향에 따른 catPostion 변화
                if (delta === 0) {
                    setCatPosition(([x, y, z]) => [x - 2.2 / 15, y + yOffset, z]);
                } // ↖
                else if (delta === 1) {
                    setCatPosition(([x, y, z]) => [x, y + yOffset, z - 2.2 / 15]);
                } // ↗
                else if (delta === 2) {
                    setCatPosition(([x, y, z]) => [x + 2.2 / 15, y + yOffset, z]);
                } // ↘
                else {
                    setCatPosition(([x, y, z]) => [x, y + yOffset, z + 2.2 / 15]);
                } // ↙

                await new Promise(resolve => requestAnimationFrame(resolve)); // 1프레임마다 업데이트
            }
        }
        setCatIndex(catIndex + dist); // catIndex 갱신
    };

    return (
        <>
            <Canvas style={{ width: '100vw', height: '100vh', background: 'linear-gradient(45deg, #8a2be2, #32cd32)' }}>
                <OrthographicCamera makeDefault zoom={35} position={[4, 8, 4]} />
                <OrbitControls />
                <ambientLight />
                <Map mapAnimation={mapAnimation} />
                {/* 고양이 위치값, 회전값을 동적으로 전달  */}
                <Cat catPosition={catPosition} catRotation={catRotation} />
            </Canvas>

            <div style={{ position: 'absolute', bottom: '5vh', left: '45vw' }}>
                <button onClick={() => setMapAnimation(!mapAnimation)}>Map Animation</button>
            </div>

            {[1, 2, 3, 4, 5, 6].map(value => (
                <div key={value} style={{ position: 'absolute', top: '5vh', left: `${30 + value * 5}vw` }}>
                    <button onClick={() => animateCat(value)}>{value}</button>
                </div>
            ))}
        </>
    );
}

export default App;
