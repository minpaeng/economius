import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsModalOpenState } from '/src/recoil/animation/atom';
import { ChanceCardInfoState } from '/src/recoil/modalInfo/atom';
import * as S from './ChanceCard.style';

function ChanceCard() {
    // const dummy = {
    //     title: '교통사고',
    //     desc: '교통사고를 당했습니다.',
    //     // TODO: result에서 주식이든 자산이든 변경되는 뭔가가 들어올 듯
    //     result: '',
    // };

    // 원래는 초기값 false로 두고 해당 위치 되면 true로 바꿔줘야할듯
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const [chanceCardInfo, setChanceCardInfo] = useRecoilState(ChanceCardInfoState);
    console.log(chanceCardInfo);
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
            top: '300px',
            left: '550px',
            right: '1050px',
            bottom: '200px',
            // width:"200px",
            // height:"400px",

            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    return (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            <S.ChanceCard>
                <S.ChanceCardTop>
                    <S.ChanceCardTopTitle>{chanceCardInfo.name}</S.ChanceCardTopTitle>
                    <S.ChanceCardTopImg src={chanceCardInfo.url} alt='Image' />
                </S.ChanceCardTop>
                <S.ChanceCardDivide />
                <S.ChanceCardBottom>
                    <div>{chanceCardInfo.description}</div>
                    {chanceCardInfo.moneyCard ? ( 
                        <div>현금 {chanceCardInfo.eventValue} 만원 {chanceCardInfo.apply}</div> 
                    ) : (
                        <div>주식 {chanceCardInfo.eventValue} % {chanceCardInfo.apply}</div>
                    )}
                </S.ChanceCardBottom>

            </S.ChanceCard>
        </Modal>
    );
}

export default ChanceCard;
