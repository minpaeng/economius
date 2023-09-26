import Modal from 'react-modal';
import {useState} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {CallBackState, IsModalOpenState} from '/src/recoil/animation/atom';
import {GoldDetailState, TradeGoldState} from '/src/recoil/trading/atom';
import * as S from './Stock.style';

import BuyOrSell from '../Common/BuyOrSell';
import GoldGraph from '../Common/GoldGraph';

function makeGoldGraphData(goldPriceHistoryData) {
    const graphData = [];

    let index = 0;
    for (index; index < goldPriceHistoryData.length; index++) {
        graphData.push(
            {
                turn: index + 1,
                price: goldPriceHistoryData[index],
            }
        )
    }

    for (index; index < 20; index++) {
        graphData.push(
            {
                turn: index + 1,
                price: null,
            }
        )
    }

    return graphData;
}

function Gold() {

    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const setCallBack = useSetRecoilState(CallBackState);
    const closeModal = () => {
        setIsModalOpen(false)
        setGoldDetail(null);
        setCallBack(true);
    };
    //  매수,매도 탭 구분 플래그
    const [buyClick, isBuyClick] = useState(true);
    // 금 매수, 매도 여부s
    const [tradeGold, setTradeGold] = useRecoilState(TradeGoldState);

    const [goldDetail, setGoldDetail] = useRecoilState(GoldDetailState);

    //   const [isGoldOpen, setIsGoldOpen] = useState(false);
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

    return goldDetail === null ? <span>loading...</span> : (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            <S.StockMain>
                <S.StockTop>
                    <S.StockTopImg src='Gold/goldbar.png' style={{width: '50px'}}/>
                    <S.StockTopTitle>
                        <S.StockTopTitleEnterprise>금거래소</S.StockTopTitleEnterprise>
                    </S.StockTopTitle>
                </S.StockTop>
                <S.StockMid>
                    <S.StockMidLeft>
                        <GoldGraph data={makeGoldGraphData(goldDetail.priceHistory)}/>
                        <S.StockMidLeftPrice>
                            현재가 : {goldDetail.price}
                            {goldDetail.rate >= 0 ?
                                <span style={{color: '#DF7D46'}}> (+{goldDetail.rate}%)</span>
                                : <span style={{color: '#DF7D46'}}> ({goldDetail.rate}%)</span>
                            }
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
                                <BuyOrSell isBuy={buyClick} StockOrGold='gold' price={goldDetail.price}/>
                            </S.Main>
                        </div>
                    </S.StockMidRight>
                </S.StockMid>
                <S.StockDivide/>
                {buyClick ? (
                    <S.StockBuyBottom onClick={() => setTradeGold([true, false])}>매수하기</S.StockBuyBottom>
                ) : (
                    <S.StockSellBottom onClick={() => setTradeGold([false, true])}>매도하기</S.StockSellBottom>
                )}
            </S.StockMain>
        </Modal>
    );
}

export default Gold;
