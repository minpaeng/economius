import Modal from 'react-modal';
import { useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { IsModalOpenState } from '/src/recoil/animation/atom';
// import financecenterimg from '/FinanceCenter/financecenter.png';
import * as S from './GlobalModal.stye';

export default function StartAccess({ videoControl }) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // modal style
    const modalStyle: any = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 10,
        },
        content: {
            display: 'flex',
            flexDirextion: 'column',
            backgroundColor: 'rgba(255,255,255,0.95)',
            overflow: 'auto',
            zIndex: 10,
            margin: 'auto',
            width: '700px',
            height: '480px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    return (
        <Modal isOpen={isModalOpen} style={modalStyle}>
            <S.Main>
                <S.Top>
                    <S.TopTitle>이코노미어스의 세계에 오신 것을 환영합니다!</S.TopTitle>
                </S.Top>

                <S.MidNoImg>
                    <S.MidDesc>
                        코노모노가타리와 픽션이며 등장하는 인물, 단체, 지명 등은 실존하는 것과 일체 관계없습니다.
                        <br />
                        <br /> The story, all names, characters, and incidents portrayed in this production are fictitious. No identification with actual
                        persons (living or deceased), places, buildings, and products is intended or should be inferred.
                        <br />
                        <br />
                    </S.MidDesc>
                </S.MidNoImg>

                <S.Divide />
                <S.Button
                    onClick={() => {
                        videoControl();
                        closeModal();
                    }}
                >
                    확인
                </S.Button>
            </S.Main>
        </Modal>
    );
}
