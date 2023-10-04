import {useState, useEffect, useRef} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import { BuyAmountState, SellAmountState } from '/src/recoil/trading/atom';
import * as S from './BuyOrSell.style';
import {StockState} from "/src/recoil/game/atom.tsx";

function BuyOrSell({ isBuy, stockId, StockOrGold, price, money, amount }) {
    const [buyAmount, setBuyAmount] = useRecoilState(BuyAmountState);
    const [sellAmount, setSellAmount] = useRecoilState(SellAmountState);
    const stocks = useRecoilValue(StockState);
    const remainedAmount = useRef(100);

    // TODO: 실제 현재 가격으로 변경하기
    const canUseMoney = money;
    const currentPrice = price;
    const haveStock = amount;

    const handleIncrement = () => {
        if (isBuy) {
            setBuyAmount(buyAmount + 1);
        } else {
            setSellAmount(sellAmount + 1);
        }
    };

    const handleDecrement = () => {
        if (isBuy) {
            setBuyAmount(buyAmount - 1);
        } else {
            setSellAmount(sellAmount - 1);
        }
    };

    const getRemainAmount = () => {
        const owners = stocks[stockId].owners;
        let total = 0;

        for (const key in owners) {
            if (owners.hasOwnProperty(key)) {
                total += owners[key];
            }
        }
        remainedAmount.current = 100 - total < 0 ? 0 : 100 - total;
    }

    useEffect(() => {
        // 처음 열 때 1로 초기화
        setBuyAmount(1);
        setSellAmount(1);
        if (stockId !== -1) getRemainAmount();
    }, []);

    return (
        <S.SelectStockSection>
            <S.StockSectionMain>
                <div
                    style={{
                        width: '70%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        margin: 'auto',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <S.HandleStockInputSection>
                        {isBuy ? (
                            buyAmount == 1 ? (
                                <S.disableDecBtn disabled>-</S.disableDecBtn>
                            ) : (
                                <S.DecBtn onClick={handleDecrement}>-</S.DecBtn>
                            )
                        ) : sellAmount == 1 ? (
                            <S.disableDecBtn disabled>-</S.disableDecBtn>
                        ) : (
                            <S.DecBtn onClick={handleDecrement}>-</S.DecBtn>
                        )}

                        <S.StockCntInput>
                            {isBuy ? (
                                <>
                                    <span>{buyAmount}</span>
                                    <span style={{ color: 'gray' }}> {StockOrGold === 'stock' ? '(주)' : '(돈)'}</span>
                                </>
                            ) : (
                                <>
                                    <span>{sellAmount}</span>
                                    <span style={{ color: 'gray' }}> {StockOrGold === 'stock' ? '(주)' : '(돈)'}</span>
                                </>
                            )}
                        </S.StockCntInput>
                        {isBuy ? (
                            (buyAmount + 1) * currentPrice > canUseMoney
                            || (StockOrGold === 'stock' && buyAmount + 1 > remainedAmount.current)? (
                                <S.disableIncBtn disabled>+</S.disableIncBtn>
                            ) : (
                                <S.IncBtn onClick={handleIncrement}>+</S.IncBtn>
                            )
                        ) : (sellAmount + 1) * currentPrice > haveStock * currentPrice? (
                            <S.disableIncBtn disabled>+</S.disableIncBtn>
                        ) : (
                            <S.IncBtn onClick={handleIncrement}>+</S.IncBtn>
                        )}
                    </S.HandleStockInputSection>

                    <S.ChangeInputDiv>
                        {isBuy ? (
                            <>
                                <span>{(currentPrice * buyAmount).toLocaleString()}</span>
                                <span style={{ color: 'gray' }}> / {canUseMoney.toLocaleString()} (원)</span>
                            </>
                        ) : (
                            <>
                                <span>{(currentPrice * sellAmount).toLocaleString()}</span>
                                <span style={{ color: 'gray' }}> / {(haveStock * currentPrice).toLocaleString()} (원)</span>
                            </>
                        )}
                    </S.ChangeInputDiv>

                    <div style={{ textAlign: 'center', color: 'gray' }}>
                        체결 이후 보유금 :{' '}
                        {isBuy ? (canUseMoney - currentPrice * buyAmount).toLocaleString() : (canUseMoney + currentPrice * sellAmount).toLocaleString()} (원)
                    </div>
                </div>
            </S.StockSectionMain>
        </S.SelectStockSection>
    );
}

export default BuyOrSell;
