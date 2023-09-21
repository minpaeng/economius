import { useState } from "react";
import * as S from "./BuyOrSell.style";

function BuyOrSell({ isBuy, StockOrGold }) {
  const [buyStock, setbuyStock] = useState(1);
  const [sellStock, setSellStock] = useState(1);

  // TODO: 실제 현재 가격으로 변경하기
  const canUseMoney = 3000000;
  const currentPrice = 70700;
  const haveStock = 7;

  const handleIncrement = () => {
    if (isBuy) {
      setbuyStock(buyStock + 1);
    } else {
      setSellStock(sellStock + 1);
    }
  };

  const handleDecrement = () => {
    if (isBuy) {
      setbuyStock(buyStock - 1);
    } else {
      setSellStock(sellStock - 1);
    }
  };

  return (
    <S.SelectStockSection>
      <S.StockSectionMain>
        <div
          style={{
            width: "70%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            justifyContent: "space-evenly",
          }}
        >
          <S.HandleStockInputSection>
            {isBuy ? (
              buyStock == 1 ? (
                <S.disableDecBtn disabled>-</S.disableDecBtn>
              ) : (
                <S.DecBtn onClick={handleDecrement}>-</S.DecBtn>
              )
            ) : sellStock == 1 ? (
              <S.disableDecBtn disabled>-</S.disableDecBtn>
            ) : (
              <S.DecBtn onClick={handleDecrement}>-</S.DecBtn>
            )}

            <S.StockCntInput>
              {isBuy ? (
                <>
                  <span>{buyStock}</span>
                  <span style={{ color: "gray" }}>
                    {" "}
                    {StockOrGold === "stock" ? "(주)" : "(돈)"}
                  </span>
                </>
              ) : (
                <>
                  <span>{sellStock}</span>
                  <span style={{ color: "gray" }}>
                    {" "}
                    {StockOrGold === "stock" ? "(주)" : "(돈)"}
                  </span>
                </>
              )}
            </S.StockCntInput>
            {isBuy ? (
              (buyStock + 1) * currentPrice > canUseMoney ? (
                <S.disableIncBtn disabled>+</S.disableIncBtn>
              ) : (
                <S.IncBtn onClick={handleIncrement}>+</S.IncBtn>
              )
            ) : (sellStock + 1) * currentPrice > haveStock * currentPrice ? (
              <S.disableIncBtn disabled>+</S.disableIncBtn>
            ) : (
              <S.IncBtn onClick={handleIncrement}>+</S.IncBtn>
            )}
          </S.HandleStockInputSection>

          <S.ChangeInputDiv>
            {isBuy ? (
              <>
                <span>{(currentPrice * buyStock).toLocaleString()}</span>
                <span style={{ color: "gray" }}>
                  {" "}
                  / {canUseMoney.toLocaleString()} (원)
                </span>
              </>
            ) : (
              <>
                <span>{(currentPrice * sellStock).toLocaleString()}</span>
                <span style={{ color: "gray" }}>
                  / {(haveStock * currentPrice).toLocaleString()} (원)
                </span>
              </>
            )}
          </S.ChangeInputDiv>

          <div style={{ textAlign: "center", color: "gray" }}>
            체결 이후 보유금 :{" "}
            {isBuy
              ? (canUseMoney - currentPrice * buyStock).toLocaleString()
              : (canUseMoney + currentPrice * sellStock).toLocaleString()}{" "}
            (원)
          </div>
        </div>
      </S.StockSectionMain>
    </S.SelectStockSection>
  );
}

export default BuyOrSell;
