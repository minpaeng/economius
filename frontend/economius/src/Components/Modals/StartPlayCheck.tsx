import Modal from 'react-modal';
import { useEffect, useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { IsModalOpenState } from '/src/recoil/animation/atom';
// import financecenterimg from '/FinanceCenter/financecenter.png';
import * as S from './GlobalModal.stye';

import backgroundMusic from '/music/background.mp3';
import { MyTurnState, PlayerSequenceState } from '/src/recoil/animation/atom';
import { PlayerIdState } from '/src/recoil/game/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
// import soundEffect from '/sound-effect.mp3';

export default function StartPlayCheck() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const closeModal = () => {
        setIsPlaying(true);
        setIsModalOpen(false);
    };
    const [myTurn, setMyTurn] = useRecoilState(MyTurnState);

    const Sequence = useRecoilValue(PlayerSequenceState);
    const userId = useRecoilValue(PlayerIdState);
    const turn = Sequence && Sequence.indexOf(userId) + 1;

    // modal style
    const modalStyle: any = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 20,
        },
        content: {
            display: 'flex',
            flexDirextion: 'column',
            backgroundColor: 'rgba(255,255,255,0.95)',
            overflow: 'auto',
            zIndex: 20,
            margin: 'auto',
            right: '27%',
            width: '700px',
            height: '480px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    const [isPlaying, setIsPlaying] = useState(false);

    const audio = new Audio(backgroundMusic);

    // 기타 효과음 넣을 시
    // const effectAudio = new Audio(soundEffect);

    useEffect(() => {
        audio.loop = true;

        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [isPlaying]);

    return (
        <Modal isOpen={isModalOpen} style={modalStyle}>
            <S.Main>
                <S.Top>
                    <S.TopTitle>Let`s Play Economius!!</S.TopTitle>
                </S.Top>

                <S.MidNoImg>
                    <S.MidDesc>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={`/navImg/turn${turn}.png`} alt='myturn-img' style={{ width: '200px' }}></img>
                        </div>
                        <br />
                        <span>
                            {localStorage.getItem('nickname')}님은 <span style={{ color: 'rgb(82,165,155)', display: 'inline' }}>{turn}번</span> 플레이어입니다.
                        </span>
                        <br />
                        <span>
                            자산을 불리거나 지출을 최소화하여 <span style={{ color: 'rgb(221,94,86)', display: 'inline' }}>승리</span>하세요!
                        </span>
                    </S.MidDesc>
                </S.MidNoImg>

                <S.Divide />
                <S.Button
                    onClick={() => {
                        // videoControl();
                        closeModal();
                    }}
                >
                    <p style={{ fontSize: '20px' }}>확인</p>
                </S.Button>
            </S.Main>
        </Modal>
    );
}
