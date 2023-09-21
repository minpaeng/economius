import { useState } from "react";
import * as S from "./BuyOrSell.style";

function BuyOrSell({ isBuy }) {
  const [buyStock, setbuyStock] = useState(1);
  const [sellStock, setSellStock] = useState(1);

  // TODO: 실제 현재 가격으로 변경하기
  const canUseMoney = 200000;
  const currentPrice = 70700;

  // TODO: 매수
  // input 내부 값 ==> (buyStock * currentPrice) / 본인 예금
  // if ((buyStock + 1) * currentPrice ) > 본인 예금 ==> + 버튼 disabled
  // if (buyStock == 1) ==> - 버튼 disabled

  // TODO: 매도
  //  input 내부 값 ==> (sellStock * currentPrice) / (보유주식수 * currentPrice)
  //  if ((sellStock + 1) * currentPrice > (보유주식수 * currentPrice)) ==> + 버튼 disabled
  //  if (sellStock == 1) ==> - 버튼 disabled

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
        <S.HandleStockInputSection>
          <S.DecBtn onClick={handleDecrement}>-</S.DecBtn>
          <S.StockCntInput
            readOnly
            type="text"
            required
            value={isBuy ? buyStock : sellStock}
            min={2}
            max={6}
          />

          <S.IncBtn onClick={handleIncrement}>+</S.IncBtn>
        </S.HandleStockInputSection>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <S.ChangeInput
            readOnly
            type="text"
            value={isBuy ? currentPrice * buyStock : currentPrice * sellStock}
          />
        </div>
      </S.StockSectionMain>
    </S.SelectStockSection>
  );
}

export default BuyOrSell;
