import { useState } from "react";
import * as S from "./BuyOrSell.style";

function BuyOrSell({ isBuy }) {
  const [buyStock, setbuyStock] = useState(1);
  const [sellStock, setSellStock] = useState(1);

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
          <S.ChangeInput readOnly type="text" />
        </div>
      </S.StockSectionMain>
    </S.SelectStockSection>
  );
}

export default BuyOrSell;
