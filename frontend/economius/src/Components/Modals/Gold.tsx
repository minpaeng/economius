import Modal from 'react-modal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsModalOpenState } from '/src/recoil/animation/atom';
import * as S from './Stock.style';

import BuyOrSell from '../Common/BuyOrSell';
import GoldGraph from '../Common/GoldGraph';

function Gold() {
    const data: any = [
        { turn: 1, price: 100 },
        { turn: 2, price: 150 },
        { turn: 3, price: 120 },
        { turn: 4, price: 130 },
        { turn: 5, price: 210 },
        { turn: 6, price: 180 },
        { turn: 7, price: 185 },
        { turn: 8, price: 180 },
        { turn: 9, price: 177 },
        { turn: 10, price: 190 },
        { turn: 11, price: 150 },
        { turn: 12, price: 115 },
        { turn: 13, price: 155 },
        { turn: 14, price: 109 },
        { turn: 15, price: 120 },
    ];

    //  매수,매도 구분 플래그
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [buyClick, isBuyClick] = useState(true);

<<<<<<< HEAD
  const [isGoldOpen, setIsGoldOpen] = useState(false);
=======
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
            top: '150px',
            left: '150px',
            right: '550px',
            bottom: '150px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };
>>>>>>> aba529b81d3e1ac55190ac9fe9b98f8ee60e553b

    return (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            <S.StockMain>
                <S.StockTop>
                    <S.StockTopImg src='Gold/goldbar.png' style={{ width: '50px' }} />
                    <S.StockTopTitle>
                        <S.StockTopTitleEnterprise>금거래소</S.StockTopTitleEnterprise>
                    </S.StockTopTitle>
                </S.StockTop>
                <S.StockMid>
                    <S.StockMidLeft>
                        <GoldGraph data={data} />
                        <S.StockMidLeftPrice>
                            현재가 : 70700 <span style={{ color: '#DF7D46' }}>(+3%)</span>
                        </S.StockMidLeftPrice>
                    </S.StockMidLeft>
                    <S.StockMidRight>
                        {/* 매도,매수 */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <S.Main>
                                <S.BtnSection>
                                    <S.BuyOrSellBtn
                                        onClick={() => {
                                            isBuyClick(true);
                                        }}
                                        style={{
                                            backgroundColor: buyClick ? '#F7BC0F' : 'rgba(247, 188, 15, 0.5)',
                                        }}
                                    >
                                        매수
                                    </S.BuyOrSellBtn>
                                    <S.BuyOrSellBtn
                                        onClick={() => {
                                            isBuyClick(false);
                                        }}
                                        style={{
                                            backgroundColor: !buyClick ? '#F7BC0F' : 'rgba(247, 188, 15, 0.5)',
                                        }}
                                    >
                                        매도
                                    </S.BuyOrSellBtn>
                                </S.BtnSection>
                                <BuyOrSell isBuy={buyClick} StockOrGold='gold' />
                            </S.Main>
                        </div>
                    </S.StockMidRight>
                </S.StockMid>
                <S.StockDivide />
                {buyClick ? <S.StockBuyBottom>매수하기</S.StockBuyBottom> : <S.StockSellBottom>매도하기</S.StockSellBottom>}
            </S.StockMain>
        </Modal>
    );
}

export default Gold;
