import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { IsMovingState, MoveDistState, MovementCardState, MovementCardOpenState } from '../../recoil/animation/atom';
import { PlayerToRollState } from '/src/recoil/game/atom';
import { useSpring, animated } from '@react-spring/web';
import Modal from 'react-modal';
import woncardfront from '/MovementCard/woncardfront.png';
import woncardback from '/MovementCard/woncardback.png';
import * as S from './MovementCard.style';

function Card({ idx, value, flip, top, left, selected, CardClick }) {
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
                    backgroundImage: `url(${woncardback})`,
                    backgroundSize: 'contain',
                }}
            ></animated.div>
            <animated.div
                onClick={CardClick}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                <S.Number>{value}</S.Number>
            </animated.div>
        </div>
    );
}

function MovementCard() {
    const [isMoving, setIsMoving] = useRecoilState(IsMovingState); // 캐릭터 이동 여부
    const [moveDist, setMoveDist] = useRecoilState(MoveDistState); // 캐릭터 이동 거리
    const [movementCard, setMovementCard] = useRecoilState(MovementCardState);
    const [movementCardOpen, setMovementCardOpen] = useRecoilState(MovementCardOpenState);
    const [PlayerToRoll] = useRecoilState(PlayerToRollState);
    // 선택된 이동카드 인덱스
    const [selected, setSelected] = useState(-1);

    const [flip1, setFlip1] = useState(false);
    const [flip2, setFlip2] = useState(false);
    const [flip3, setFlip3] = useState(false);

    const flipAll = () => {
        setTimeout(() => setFlip1(true), 400);
        setTimeout(() => setFlip2(true), 700);
        setTimeout(() => setFlip3(true), 1000);
    };

    const closeModal = () => {
        setMovementCardOpen(false);
        setMovementCard(null);
        setSelected(-1);
        setFlip1(false);
        setFlip2(false);
        setFlip3(false);
    };

    useEffect(() => {
        if (!movementCardOpen) return;
        flipAll();
    }, [movementCardOpen]);

    const MoveButtonClick = (selectednum: number) => {
        setMoveDist(selectednum === -1 ? movementCard[1] : movementCard[selectednum]);
        if (selectednum === -1) {
            setSelected(1);
        }
        setTimeout(() => {
            closeModal();
            setIsMoving(true);
        }, 500);
    };

    return (
        <Modal isOpen={movementCardOpen} style={S.modalStyle} onRequestClose={closeModal}>
            {movementCard === null ? (
                `로딩중입니다...`
            ) : (
                <>
                    {PlayerToRoll === Number(localStorage.getItem('player')) ? (
                        <>
                            <Card idx={0} value={movementCard[0]} top={'10%'} left={'8%'} flip={flip1} selected={selected} CardClick={() => setSelected(0)} />
                            <Card idx={1} value={movementCard[1]} top={'10%'} left={'38%'} flip={flip2} selected={selected} CardClick={() => setSelected(1)} />
                            <Card idx={2} value={movementCard[2]} top={'10%'} left={'68%'} flip={flip3} selected={selected} CardClick={() => setSelected(2)} />
                            <S.Button onClick={() => MoveButtonClick(selected)}>이동카드 선택</S.Button>
                        </>
                    ) : (
                        <>
                            <Card idx={0} value={movementCard[0]} top={'10%'} left={'8%'} flip={flip1} selected={null} CardClick={null} />
                            <Card idx={1} value={movementCard[1]} top={'10%'} left={'38%'} flip={flip2} selected={null} CardClick={null} />
                            <Card idx={2} value={movementCard[2]} top={'10%'} left={'68%'} flip={flip3} selected={null} CardClick={null} />
                        </>
                    )}
                    {/* <S.Caution>(시간 초과 시 자동으로 선택됩니다)</S.Caution> */}
                </>
            )}
        </Modal>
    );
}

export default MovementCard;
