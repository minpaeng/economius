import Modal from 'react-modal';
import * as S from './BigEvent.style';
import { useRecoilState } from 'recoil';
import { IsModalOpenState } from '/src/recoil/animation/atom';

import { useEffect, useState } from 'react';

function BigEvent({issue}) {
    // 원래는 초기값 false로 두고 해당 턴이 되면 true로 바꿔줘야할듯
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const [wordColor, setWordColor] = useState("white");

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (issue.type === "BOOM"){
            setWordColor("black");
        }
        else{
            setWordColor("white");
        }
    })
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
            //   backgroundColor: "rgba(255,255,255,0.95)",
            overflow: 'auto',
            zIndex: 10,
            top: '80px',
            left: '50px',
            right: '400px',
            bottom: '80px',
            border: `5px solid white`,
            borderRadius: '20px',
            backgroundImage: `url("${issue.url}")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },
    };

    return (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            <S.BigEvent>
                <S.BigEventLeft />
                <S.BigEventRight style={{color: wordColor}}>
                    <S.BigEventRightTitle>{issue.name}</S.BigEventRightTitle>
                    <S.BigEventRightChange1>{issue.year}</S.BigEventRightChange1>
                    <S.BigEventRightDesc>{issue.description}</S.BigEventRightDesc>
                    <S.BigEventRightChange1>금리 변동</S.BigEventRightChange1>
                    <S.BigEventRightChange2>주식 변동</S.BigEventRightChange2>
                </S.BigEventRight>
            </S.BigEvent>
        </Modal>
    );
}

export default BigEvent;
