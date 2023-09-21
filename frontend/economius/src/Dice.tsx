import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';

function Dice() {
    // 평면
    const Plane = ({ color, ...props }) => {
        const [ref] = usePlane(() => ({ ...props }));
        return (
            <mesh ref={ref} receiveShadow>
                <planeGeometry attach='geometry' args={[9, 9]} />
                <meshPhongMaterial attach='material' color={color} />
            </mesh>
        );
    };

    // 정육면체
    const Cube = props => {
        const sides = 6;
        const radius = 0.5;
        const [ref, api] = useBox(() => ({ args: [radius, radius, radius], mass: 1, ...props }));
        const [goLeft, setGoLeft] = useState(false);

        const handleDrop = () => {
            if (!goLeft) {
                // 클릭 시 주사위를 떨어뜨리는 힘을 적용
                api.applyImpulse([0, 0, -7], [0, 0, 0]);
                setGoLeft(true);
            } else {
                api.applyImpulse([0, 0, 7], [0, 0, 0]);
                setGoLeft(false);
            }
        };

        // 주사위의 각 면에 색상을 할당합니다.
        const diceColors = ['#ff5733', '#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];

        return (
            <Box args={[radius, radius, radius]} ref={ref} onClick={handleDrop} castShadow receiveShadow>
                {Array.from(Array(sides)).map((_, i) => (
                    <meshPhongMaterial attachArray='material' color={diceColors[i]} key={i} />
                ))}
            </Box>
        );
    };

    return (
        <Physics gravity={[0, -15, 0]}>
            <Plane color='orange' position={[-3.3, -2.6, 1.1]} rotation={[4.71, 0, 0]} />
            <Cube position={[-3.4, 3, 1]} />
        </Physics>
    );
}

export default Dice;
