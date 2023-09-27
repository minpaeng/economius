import * as S from "../../PortfolioProperty/PortfolioProperty.style";
import { useRecoilState } from "recoil";
import { StockClickIdState } from "/src/recoil/animation/atom";

function StockChangeItem({
  id,
  imgPath,
  title,
  type,
  value,
  valueChange,
  setSideBarType,
}) {
  const [stockId, setStockId] = useRecoilState(StockClickIdState);

  let percentStyleSpan;

  if (valueChange > 0) {
    percentStyleSpan = <span style={{ color: "red" }}> (+{valueChange}%)</span>;
  } else if (valueChange < 0) {
    percentStyleSpan = <span style={{ color: "blue" }}> ({valueChange}%)</span>;
  } else {
    percentStyleSpan = (
      <span style={{ color: "black" }}> ({valueChange}%)</span>
    );
  }

  const handleButtonClick = () => {
    setSideBarType("StockCheck"); // 원하는 값으로 설정
    setStockId(id);
  };

  return (
    <S.StockItem>
      <S.PropertyLayoutItem onClick={handleButtonClick}>
        <S.LayoutTop>
          <S.LayoutTopLeft>
            <img src={`Stock/${imgPath}.png`} alt="img" />
            <div>
              <div>{title}</div>
              <div style={{ color: "gray" }}>{type}</div>
            </div>
          </S.LayoutTopLeft>
          <S.LayoutTopRight>
            현재가: {value.toLocaleString()}
            {percentStyleSpan}
          </S.LayoutTopRight>
        </S.LayoutTop>
      </S.PropertyLayoutItem>
    </S.StockItem>
  );
}
export default StockChangeItem;
