import { useRecoilState } from 'recoil';
import { IsModalOpenState } from '/src/recoil/animation/atom';
import Modal from 'react-modal';
import { useState } from 'react';
import * as S from './Stock.style';
import StockGraph from '../Common/StockGraph';
import BuyOrSell from '../Common/BuyOrSell';

function Stock() {
    const data: any = [
        { turn: 1, open: 6629.81, high: 6650.5, low: 6623.04, close: 6633.33 },
        { turn: 2, open: 6632.01, high: 6643.59, low: 6620, close: 6630.11 },
        { turn: 3, open: 6630.71, high: 6648.95, low: 6623.34, close: 6635.65 },
        { turn: 4, open: 6635.651, high: 6651, low: 6629.67, close: 6638.24 },
        { turn: 5, open: 6638.24, high: 6640, low: 6620, close: 6624.47 },
        { turn: 6, open: 6624.53, high: 6636.03, low: 6621.68, close: 6624.31 },
        { turn: 7, open: 6624.61, high: 6632.2, low: 6617, close: 6626.02 },
        { turn: 8, open: 6627, high: 6627.62, low: 6584.22, close: 6603.02 },
        { turn: 9, open: 6605, high: 6608.03, low: 6598.95, close: 6604.01 },
        { turn: 10, open: 6604.5, high: 6614.4, low: 6602.26, close: 6608.02 },
        { turn: 11, open: 6608.02, high: 6610.68, low: 6601.99, close: 6608.91 },
        { turn: 12, open: 6608.91, high: 6618.99, low: 6608.01, close: 6612 },
        { turn: 13, open: null, high: null, low: null, close: null },
        { turn: 14, open: null, high: null, low: null, close: null },
        { turn: 15, open: null, high: null, low: null, close: null },
        { turn: 16, open: null, high: null, low: null, close: null },
        { turn: 17, open: null, high: null, low: null, close: null },
        { turn: 18, open: null, high: null, low: null, close: null },
        { turn: 19, open: null, high: null, low: null, close: null },
        { turn: 20, open: null, high: null, low: null, close: null },
    ];

    //  매수,매도 구분 플래그
    const [buyClick, isBuyClick] = useState(true);

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
            top: '150px',
            left: '150px',
            right: '550px',
            bottom: '150px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    return (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            <S.StockMain>
                <S.StockTop>
                    <S.StockTopImg src='Stock/samsung.png' />
                    <S.StockTopTitle>
                        <S.StockTopTitleEnterprise>삼성전자</S.StockTopTitleEnterprise>
                        <S.StockTopTitleType>반도체</S.StockTopTitleType>
                    </S.StockTopTitle>
                </S.StockTop>
                <S.StockMid>
                    <S.StockMidLeft>
                        <StockGraph data={data} />
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
                                <BuyOrSell isBuy={buyClick} StockOrGold='stock' />
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

export default Stock;
