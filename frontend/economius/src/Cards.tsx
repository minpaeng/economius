import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { IsMovingState, MoveDistState, MovementCardState, MovementCardOpenState } from './recoil/animation/atom';
import { useSpring, animated } from '@react-spring/web';
import Modal from 'react-modal';
import styled from 'styled-components';
import woncardfront from '/Cards/woncardfront.png';
import woncardbehind from '/Cards/woncardbehind.png';
import dollarcardfront from '/Cards/dollarcardfront.png';
import dollarcardbehind from '/Cards/dollarcardbehind.png';

function Card({ idx, value, flip, top, left, selected, onClick }) {
    const { opacity, transform } = useSpring({
        opacity: flip ? 1 : 0,
        transform: `perspective(600px) rotateY(${flip ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    const imageSize = useSpring({
        width: selected === idx ? '140px' : '120px', // 20px 커지게 변경
        left: selected === idx ? `${parseFloat(left) - 2.5}%` : left,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    const SNumber = styled.div`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 45px;
        color: green;
    `;

    return (
        <div>
            <animated.div
                style={{
                    position: 'absolute',
                    top: top,
                    left: left,
                    width: '120px',
                    aspectRatio: '58/90',
                    opacity: opacity.to(o => 1 - o),
                    transform,
                    backgroundImage: `url(${woncardbehind})`,
                    backgroundSize: 'contain',
                }}
            ></animated.div>
            <animated.div
                onClick={onClick}
                style={{
                    position: 'absolute',
                    top: top,
                    left: left,
                    ...imageSize,
                    opacity,
                    transform,
                    aspectRatio: '58/90',
                    rotateY: '180deg',
                    backgroundImage: `url(${woncardfront})`,
                    backgroundSize: 'contain',
                    border: 'soild 1px red',
                }}
            >
                <SNumber>{value}</SNumber>
            </animated.div>
        </div>
    );
}

function Button({ onClick }) {
    const SButton = styled.div`
        position: absolute;
        bottom: 9%;
        left: 50%;
        transform: translateX(-50%);
        padding: 11px 15px;
        border-radius: 20px;
        background: #ffdaae;
        &:hover {
            background: #ffaa55;
        }
    `;

    const SCaution = styled.div`
        position: absolute;
        bottom: 3%;
        left: 50%;
        transform: translateX(-50%);
        color: gray;
        font-size: 10px;
    `;
    return (
        <>
            <SButton onClick={onClick}>이동카드 선택</SButton>
            <SCaution>(시간 초과 시 자동으로 선택됩니다)</SCaution>
        </>
    );
}

function CardsSet() {
    const [isMoving, setIsMoving] = useRecoilState(IsMovingState); // 캐릭터 이동 여부
    const [moveDist, setMoveDist] = useRecoilState(MoveDistState); // 캐릭터 이동 거리
    const [movementCard, setMovementCard] = useRecoilState(MovementCardState);
    const [movementCardOpen, setMovementCardOpen] = useRecoilState(MovementCardOpenState);
    const [dummyCard, setDummyCard] = useState([3, 8, 5]);
    const closeModal = () => {
        setMovementCardOpen(false);
    };
    // 선택된 이동카드 인덱스
    const [selected, setSelected] = useState(-1);
    // 각 카드 세트의 flip 상태를 개별적으로 관리
    const [flip1, setFlip1] = useState(false);
    const [flip2, setFlip2] = useState(false);
    const [flip3, setFlip3] = useState(false);

    useEffect(() => {
        const flipAll = () => {
            setTimeout(() => setFlip1(true), 400);
            setTimeout(() => setFlip2(true), 700);
            setTimeout(() => setFlip3(true), 1000);
        };
        flipAll();
    }, []);

    const modalStyle: any = {
        overlay: {
            position: 'fixed',
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 10,
        },
        content: {
            backgroundColor: 'rgba(255,255,255,0.95)',
            overflow: 'hidden',
            zIndex: 10,
            margin: 'auto',
            right: '25%',
            width: '500px',
            height: '370px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    return (
        <Modal isOpen={movementCardOpen} style={modalStyle} onRequestClose={closeModal}>
            {dummyCard === null ? (
                `로딩중입니다...`
            ) : (
                <>
                    <Card idx={0} value={dummyCard[0]} top={'10%'} left={'8%'} flip={flip1} selected={selected} onClick={() => setSelected(0)} />
                    <Card idx={1} value={dummyCard[1]} top={'10%'} left={'38%'} flip={flip2} selected={selected} onClick={() => setSelected(1)} />
                    <Card idx={2} value={dummyCard[2]} top={'10%'} left={'68%'} flip={flip3} selected={selected} onClick={() => setSelected(2)} />
                    <Button
                        onClick={() => {
                            setTimeout(() => {
                                closeModal();
                                setIsMoving(true);
                                setMoveDist(selected === -1 ? dummyCard[1] : dummyCard[selected]);
                            }, 500);
                            if (selected === -1) {
                                setSelected(1);
                            }
                        }}
                    />
                </>
            )}
        </Modal>
    );
}

export default CardsSet;
