import { Suspense, useState, useEffect, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useRecoilState } from 'recoil';
import { MapAnimationIndexState, NowPlayerPositionState, IsModalOpenState } from '/src/recoil/animation/atom';

// ['0', '1', ... , '30', '31']

const animationNames = Array.from({ length: 32 }, (_, index) => `${index}`);

function Map() {
    const mapPath = 'animation-map.gltf';
    const map = useLoader(GLTFLoader, mapPath);
    const mapRef = useRef<THREE.Group>();
    const position = [1.3, -2, 4.3]; // 오른대각, 위아래, 왼대각
    const scale = [0.5, 0.5, 0.5];
    const [mapAniIdx, setMapAniIdx] = useRecoilState(MapAnimationIndexState); // 맵 애니메이션 칸
    const [nowPlayerPosition, setNowPlayerPosition] = useRecoilState(NowPlayerPositionState); // 플레이어 최종 위치
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState); // 자산 모달 여부

    let mixer: any;
    mixer = new THREE.AnimationMixer(map.scene); // 모델에 적용된 애니메이션을 제어하는 변수
    useEffect(() => {
        // map.animations 배열에서 mapAniIdx에 해당하는 애니메이션을 찾음
        const animation = map.animations.find((anim: any) => anim.name === animationNames[mapAniIdx]);
        if (animation) {
            const clip = mixer.clipAction(animation);
            clip.setLoop(THREE.LoopOnce); // 한 번만 재생
            clip.play();
            clip.clampWhenFinished = true; // 클립이 재생을 완료하면 mixer에서 제거
        }
        setTimeout(() => {
            if (mapAniIdx === nowPlayerPosition) {
                setIsModalOpen(true);
            }
        }, 500);
    }, [mapAniIdx]);

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
            {/* 3D 객체 렌더링 */}
            <primitive object={map.scene} scale={scale} position={position} ref={mapRef} />
        </Suspense>
    );
}

export default Map;
