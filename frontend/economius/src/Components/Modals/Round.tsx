import Modal from 'react-modal';
import { useRecoilValue } from 'recoil';
import { Img, modalStyle, TextOverlay } from '/src/Components/Modals/Round.style.ts';
import { GameRoundState } from '/src/recoil/game/atom.tsx';
import { useEffect, useState } from 'react';

function Round() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const gameRound = useRecoilValue(GameRoundState);
    const [timerId, setTimerId] = useState(null);

    const closeModal = () => {
        setIsModalOpen(false);
        if (timerId) clearTimeout(timerId);
    };

    useEffect(() => {
        if (gameRound !== 0) {
            setIsModalOpen(true);
        }
    }, [gameRound]);

    // 3초 후에 자동 꺼짐
    useEffect(() => {
        if (!isModalOpen) return;
        setTimeout(() => {
            setIsModalOpen(false);
        }, 3000);
    }, [isModalOpen]);

    return (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyle}>
            <Img src={'/2D_Chracter/Bear/Bear Pose - 02.png'} />
            <TextOverlay>
                <div style={{ fontSize: '40px', paddingTop: '35px' }}>Round : {gameRound}</div>
            </TextOverlay>
        </Modal>
    );
}

export default Round;
