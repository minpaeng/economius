import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CallBackState, IsModalOpenState } from '/src/recoil/animation/atom';
import { GoldDetailState, TradeGoldState } from '/src/recoil/trading/atom';
import { PlayerToRollState, PlayerIdState, PortfolioState, GoldState } from '/src/recoil/game/atom';
import * as S from './Stock.style';
import { ExitButton } from './GlobalModal.stye';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';
import ChartSectionItem from '../Common/EconomicIndicator/IndicatorSection/ChartSectionItem';

import BuyOrSell from '../Common/BuyOrSell';
import GoldGraph from '../Common/GoldGraph';
import OtherPerson from './OtherPerson';

function makeGoldGraphData(goldPriceHistoryData) {
    const graphData = [];

    let index = 0;
    for (index; index < goldPriceHistoryData.length; index++) {
        graphData.push({
            turn: index + 1,
            price: goldPriceHistoryData[index],
        });
    }

    for (index; index < 20; index++) {
        graphData.push({
            turn: index + 1,
            price: null,
        });
    }

    return graphData;
}

function Gold() {
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const setCallBack = useSetRecoilState(CallBackState);
    const closeModal = () => {
        setIsModalOpen(false);
        setGoldDetail(null);
        setCallBack(true);
    };
    //  매수,매도 탭 구분 플래그
    const [buyClick, isBuyClick] = useState(true);
    // 금 매수, 매도 여부
    const [tradeGold, setTradeGold] = useRecoilState(TradeGoldState);
    const [goldDetail, setGoldDetail] = useRecoilState(GoldDetailState);
    const playerId = useRecoilValue(PlayerIdState);
    const playerToRoll = useRecoilValue(PlayerToRollState);
    const portfolios = useRecoilValue(PortfolioState);

    const goldData = useRecoilValue(GoldState);

    function dataChange(arr) {
        const returnData = [];
        for (let i = 0; i < arr.length; i++) {
            returnData.push({ turn: i + 1, price: arr[i] });
        }

        return returnData;
    }

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

    useEffect(() => {
        effectAudioPopup.play(); // 출력할 위치에 작성
    }, []);

    return (
        <>
            {playerId === playerToRoll ? (
                <Modal isOpen={isModalOpen} style={modalStyle}>
                    <ExitButton onClick={() => (closeModal(), effectAudioClick.play())} src='/button/exit.png' alt='exit' />
                    {goldDetail === null ? (
                        `loading...`
                    ) : (
                        <S.StockMain>
                            <S.StockTop>
                                <S.StockTopImg src='Gold/goldbar.png' style={{ width: '50px' }} />
                                <S.StockTopTitle>
                                    <S.StockTopTitleEnterprise>금거래소</S.StockTopTitleEnterprise>
                                </S.StockTopTitle>
                            </S.StockTop>
                            <S.StockMid>
                                <S.StockMidLeft>
                                    {/* <GoldGraph data={makeGoldGraphData(goldDetail.priceHistory)} /> */}
                                    <ChartSectionItem data={dataChange(goldData.priceHistory)} />
                                    <S.StockMidLeftPrice>
                                        현재가 : {goldDetail.price.toLocaleString()}
                                        {goldDetail.rate >= 0 ? (
                                            <span style={{ color: 'rgb(82,165,155)' }}> (+{goldDetail.rate}%)</span>
                                        ) : (
                                            <span style={{ color: 'rgb(221,94,86)' }}> ({goldDetail.rate}%)</span>
                                        )}
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
                                                        effectAudioClick.play();
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
                                                        effectAudioClick.play();
                                                    }}
                                                    style={{
                                                        backgroundColor: !buyClick ? '#F7BC0F' : 'rgba(247, 188, 15, 0.5)',
                                                    }}
                                                >
                                                    매도
                                                </S.BuyOrSellBtn>
                                            </S.BtnSection>
                                            <BuyOrSell
                                                isBuy={buyClick}
                                                stockId={-1}
                                                StockOrGold='gold'
                                                price={goldDetail.price}
                                                amount={portfolios[playerId].gold.amount}
                                                money={portfolios[playerId].money}
                                            />
                                        </S.Main>
                                    </div>
                                </S.StockMidRight>
                            </S.StockMid>
                            <S.StockDivide />
                            {buyClick ? (
                                <S.StockBuyBottom onClick={() => (setTradeGold([true, false]), effectAudioClick.play())}>매수하기</S.StockBuyBottom>
                            ) : (
                                <S.StockSellBottom onClick={() => (setTradeGold([false, true]), effectAudioClick.play())}>매도하기</S.StockSellBottom>
                            )}
                        </S.StockMain>
                    )}
                </Modal>
            ) : (
                <OtherPerson />
            )}
        </>
    );
}

export default Gold;
