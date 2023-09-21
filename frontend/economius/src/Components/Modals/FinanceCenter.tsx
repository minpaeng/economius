import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsModalOpenState } from '/src/recoil/animation/atom';
import financecenterimg from '/FinanceCenter/financecenter.png';
import * as S from './GlobalModal.stye';

function FinanceCenter() {
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
        <Modal isOpen={true} style={modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Top>
                    <S.TopTitle>종합거래소</S.TopTitle>
                </S.Top>

                <S.Mid>
                    <S.MidImg src={financecenterimg} alt='financecenterimg' />
                    <S.MidDesc>주식, 부동산, 적금, 보험, 금, 코인 등 금융 거래를 한 곳에서 할 수 있습니다.</S.MidDesc>
                </S.Mid>

                <S.RoundButton>
                    <span>입장하기</span>
                </S.RoundButton>
            </S.Main>
        </Modal>
    );
}

export default FinanceCenter;
