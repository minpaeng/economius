import * as S from "../PortfolioProperty.style";

function PortfolioSavingItem({
  title,
  rate,
  cycleCnt,
  currentCycle,
  cycleMoney,
  expectedProfit,
}) {
  return (
    <S.PropertyLayoutItem>
      <S.LayoutTop>
        <S.LayoutTopLeft>
          <img src={`Bank/BankTitle.png`} alt="img" />
          <div>
            <div>{title}</div>
          </div>
        </S.LayoutTopLeft>
        <S.LayoutTopRight>금리: {rate}%</S.LayoutTopRight>
      </S.LayoutTop>

      <S.DivideLine />

      <S.LayoutBottom>
        <S.LayoutBottomitem>
          <S.LayoutBottomitemLeft>월 납입금</S.LayoutBottomitemLeft>
          <S.LayoutBottomitemRight>
            {cycleMoney.toLocaleString()}
          </S.LayoutBottomitemRight>
        </S.LayoutBottomitem>
        <S.LayoutBottomitem>
          <S.LayoutBottomitemLeft>
            납입 바퀴 / 총 납입 바퀴
          </S.LayoutBottomitemLeft>
          <S.LayoutBottomitemRight>
            {currentCycle}/{cycleCnt}
          </S.LayoutBottomitemRight>
        </S.LayoutBottomitem>
        <S.LayoutBottomitem>
          <S.LayoutBottomitemLeft>만기 반환액</S.LayoutBottomitemLeft>
          <S.LayoutBottomitemRight>
            {expectedProfit.toLocaleString()}
          </S.LayoutBottomitemRight>
        </S.LayoutBottomitem>
      </S.LayoutBottom>
    </S.PropertyLayoutItem>
  );
}

export default PortfolioSavingItem;
