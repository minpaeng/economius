import * as S from "../PortfolioProperty.style";

function PortfolioMoney() {
  const Money = 1000000;
  return (
    <S.ToggleLayout>
      <S.LayoutTop>
        <S.LayoutTopLeft>
          <img src="Bank/dollar-coin 15.png" alt="img" />
          <div style={{ fontSize: "28px" }}>현금</div>
        </S.LayoutTopLeft>
        <S.LayoutTopRight>
          {Money ? (
            <div> 총 자산가치 : {Money.toLocaleString()} (원)</div>
          ) : (
            "보유 중인 현금이 없습니다."
          )}
        </S.LayoutTopRight>
      </S.LayoutTop>
    </S.ToggleLayout>
  );
}
export default PortfolioMoney;
