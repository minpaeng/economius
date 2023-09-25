import * as S from "../../PortfolioProperty/PortfolioProperty.style";

function StockChangeItem({ imgPath, title, type, value, valueChange }) {
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

  return (
    <S.PropertyLayoutItem>
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
  );
}
export default StockChangeItem;
