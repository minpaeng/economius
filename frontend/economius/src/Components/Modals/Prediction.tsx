import Modal from 'react-modal';
import { useState } from 'react';
import predictionimg from '/prediction/prediction.png';
import * as S from './GlobalModal.stye';

function Prediction() {
    // 원래는 초기값 false로 두고 해당 위치 되면 true로 바꿔줘야할듯
    const [isOpen, setIsOpen] = useState(false);
    // 아니면 해지 모달
    const closeModal = () => {
        setIsOpen(false);
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
        <Modal isOpen={isOpen} style={modalStyle} onRequestClose={closeModal}>
            <S.Main>
                <S.Top>
                    <S.TopTitle>예언소</S.TopTitle>
                </S.Top>

                <S.Mid>
                    <S.MidImg src={predictionimg} alt='predictionimg' />
                    <S.MidDesc>다음에 일어날 경제 이슈를 예언해줍니다.</S.MidDesc>
                </S.Mid>

                <S.RoundButton>
                    <span>예언듣기</span>
                </S.RoundButton>
            </S.Main>
        </Modal>
    );
}

export default Prediction;
