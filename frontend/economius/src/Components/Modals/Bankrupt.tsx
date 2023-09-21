import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsModalOpenState } from '/src/recoil/animation/atom';
import financecenterimg from '/FinanceCenter/financecenter.png';
import * as S from './GlobalModal.stye';

function Bankrupt() {
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
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
            width: '500px',
            height: '350px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    return (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Top>
                    <S.TopTitle>파산하였습니다...</S.TopTitle>
                </S.Top>

                <S.Mid>
                    <S.MidImg src={financecenterimg} alt='financecenterimg' />
                    <S.MidDesc>다음번에 더 잘하면 돼요!</S.MidDesc>
                    <S.MidDesc>최종 순위 : 3등</S.MidDesc>
                </S.Mid>

                <S.Divide />
                <S.Button>확인</S.Button>
            </S.Main>
        </Modal>
    );
}

export default Bankrupt;
