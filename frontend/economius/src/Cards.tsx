import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { MovementCardsState } from './recoil/animation/atom';
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';
import predictionimg from '/Prediction/prediction.png';
import woncardfront from '/Cards/woncardfront.png';
import woncardbehind from '/Cards/woncardbehind.png';
import dollarcardfront from '/Cards/dollarcardfront.png';
import dollarcardbehind from '/Cards/dollarcardbehind.png';

const CardNumber = styled.div`
    width: 50%;
    height: 50%;
`;

function Card({ flip, top, left, value, onClick }) {
    const { opacity, transform } = useSpring({
        opacity: flip ? 1 : 0,
        transform: `perspective(600px) rotateY(${flip ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    return (
        <div onClick={onClick}>
            <animated.div
                style={{
                    position: 'absolute',
                    top: top,
                    left: left,
                    width: '10%',
                    height: '10%',
                    opacity: opacity.to(o => 1 - o),
                    transform,
                    backgroundImage: `url(${predictionimg})`,
                    backgroundSize: 'cover',
                }}
            >
                <div></div>
            </animated.div>
            <animated.div
                style={{
                    position: 'absolute',
                    top: top,
                    left: left,
                    width: '10%',
                    height: '10%',
                    opacity,
                    transform,
                    rotateX: '180deg',
                    // backgroundImage: `url(${hotelimg})`,
                    backgroundSize: 'cover',
                }}
            ></animated.div>
        </div>
    );
}

function CardsSet() {
    const [movementCards, setMovementCards] = useRecoilState(MovementCardsState);
    // 각 카드 세트의 flip 상태를 개별적으로 관리
    const [flip1, setFlip1] = useState(false);
    const [flip2, setFlip2] = useState(false);
    const [flip3, setFlip3] = useState(false);

    useEffect(() => {
        const flipAll = () => {
            setTimeout(() => setFlip1(true), 500);
            setTimeout(() => setFlip2(true), 1000);
            setTimeout(() => setFlip3(true), 1500);
        };
        flipAll();
    }, []);

    return (
        <div>
            <Card top={'30%'} left={'20%'} flip={flip1} value={movementCards} onClick={() => setFlip1(prevFlip => !prevFlip)} />
            <Card top={'30%'} left={'30%'} flip={flip2} value={movementCards} onClick={() => setFlip2(prevFlip => !prevFlip)} />
            <Card top={'30%'} left={'40%'} flip={flip3} value={movementCards} onClick={() => setFlip3(prevFlip => !prevFlip)} />
        </div>
    );
}

export default CardsSet;
