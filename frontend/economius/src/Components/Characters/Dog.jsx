import { Suspense, useEffect, useState, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useRecoilState } from 'recoil';
import { MapAnimationIndexState, IsMovingState } from '/src/recoil/animation/atom';
import { effectAudioSteps } from '/src/Audio';

// 맵 좌표
const mapPosition = [
    [1.4, -1.35, 5.8], // 시작점, dx = -1.55, dz = 0.2
    [-0.15, -1.35, 6], // 첫 줄, dx = -1.05
    [-1.2, -1.35, 6],
    [-2.25, -1.35, 6],
    [-3.3, -1.35, 6],
    [-4.35, -1.35, 6],
    [-5.4, -1.35, 6],
    [-6.45, -1.35, 6], // dx = -1.55, dz = -0.2
    [-8, -1.35, 5.8], // 코인선물, dx = 0.4, dz = -1.55
    [-7.6, -1.35, 4.25], // 둘째 줄, dz = -1.05
    [-7.6, -1.35, 3.2],
    [-7.6, -1.35, 2.15],
    [-7.6, -1.35, 1.1],
    [-7.6, -1.35, 0.05],
    [-7.6, -1.35, -1],
    [-7.6, -1.35, -2.05], // dx = -0.4, dz = -1.55
    [-8, -1.35, -3.6], // 종합금융센터, dx = 1.55, dz = 0.4
    [-6.45, -1.35, -3.2], // 셋째 줄, dx = 1.05
    [-5.4, -1.35, -3.2],
    [-4.35, -1.35, -3.2],
    [-3.3, -1.35, -3.2],
    [-2.25, -1.35, -3.2],
    [-1.15, -1.35, -3.2],
    [-0.1, -1.35, -3.2], // dx = 1.55, dz = -0.4
    [1.45, -1.35, -3.6], // 예언소, dx = 0.2, dz = 1.55
    [1.65, -1.35, -2.05], // 넷째 줄, dz = 1.05
    [1.65, -1.35, -1],
    [1.65, -1.35, 0.05],
    [1.65, -1.35, 1.1],
    [1.65, -1.35, 2.15],
    [1.65, -1.35, 3.2],
    [1.65, -1.35, 4.25], // dx = -0.2, dz = 1.55
];

// 캐릭터 방향 ↖ ↗ ↘ ↙ ↓
const characterRotationY = [-Math.PI / 2, Math.PI, Math.PI / 2, Math.PI * 2, Math.PI / 4];

// props 의 type 정의
// 1. import { CharacterType } from '/src/types/charcter 이런 식으로 import 해서 쓸 수 있음
// 2. type 을 직접 컴포넌트 내에 정의할 수 있음. type 대신 interface 라고도 쓸 수 있음
// type CharacterType = {
//     positionIdx: number;
//     moveDist: number;
//     opacity: number;
//     radius: number;
//     steps: number;
// };
// 3. 객체 분해해서 인라인으로 타입을 정의할 수 있음
// function Dog({ positionIdx, moveDist, opacity, radius, steps }:{ positionIdx: number; moveDist: number; opacity: number; radius: number; steps: number }) {
function Dog({ positionIdx, moveDist, opacity, radius, steps }) {
    const gltfPath = 'Dog.gltf';
    const gltf = useLoader(GLTFLoader, gltfPath);
    const gltfRef = useRef();
    const scale = [0.2, 0.2, 0.2];

    const [position, setPosition] = useState(mapPosition[positionIdx]); // 캐릭터 좌표
    const [rotationY, setRotationY] = useState(characterRotationY[4]); // 캐릭터 방향
    const [mapAniIdx, setMapAniIdx] = useRecoilState(MapAnimationIndexState); // 맵 애니메이션 칸
    const [isMoving, setIsMoving] = useRecoilState(IsMovingState); // 캐릭터 이동 여부

    // 투명도 설정
    gltf.scene.traverse(child => {
        if (child.isMesh) {
            child.material.transparent = true;
            child.material.opacity = opacity; //
        }
    });

    const moveCharacter = async () => {
        for (let i = positionIdx + 1 - moveDist; i < positionIdx + 1; i++) {
            // 맵 칸
            const mapIdx = i & 31; // 31로 나눈 나머지
            // 캐릭터 방향
            setRotationY(characterRotationY[mapIdx ? (mapIdx - 1) >> 3 : 3]); // mapIdx를 8로 나눈 몫, mapIdx = 0 예외처리
            // 캐릭터 위치
            const dx = (mapPosition[mapIdx][0] - mapPosition[mapIdx ? mapIdx - 1 : 31][0]) / steps; // 다음 좌표와의 차이 / 프레임 수, mapIdx = 0 예외처리
            const dz = (mapPosition[mapIdx][2] - mapPosition[mapIdx ? mapIdx - 1 : 31][2]) / steps;
            for (let j = 0; j < steps; j++) {
                const t = j / steps;
                const angle = Math.PI * t; // 0부터 π까지 증가
                const dy = radius * Math.sin(angle);
                setPosition(([x, _, z]) => [x + dx, -1.35 + dy, z + dz]);
                // 비동기 프레임 갱신
                await new Promise(resolve => requestAnimationFrame(resolve));
            }
            // 점프 소리
            effectAudioSteps.play();
            // 오류방지를 위해 한 칸마다 위치 갱신
            setPosition(mapPosition[mapIdx]);
            // 맵 애니메이션 칸 갱신
            setMapAniIdx(mapIdx);
        }
        // 애니메이션 끝난 후 캐릭터 방향
        setRotationY(characterRotationY[4]);
        // 캐릭터 이동 여부 갱신
        setIsMoving(false);
    };

    // 플레이어 위치(idx)가 바뀔 때만 실행
    useEffect(() => {
        moveCharacter();
    }, [positionIdx]);

    return (
        <Suspense fallback={null}>
            <primitive object={gltf.scene} scale={scale} position={position} rotation-y={rotationY} ref={gltfRef} />
        </Suspense>
    );
}

export default Dog;
