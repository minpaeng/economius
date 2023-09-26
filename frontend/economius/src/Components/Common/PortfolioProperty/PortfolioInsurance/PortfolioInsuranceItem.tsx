import * as S from "../PortfolioProperty.style";

function PortfolioInsuranceItem({
  title,
  totalPrice,
  cycleCnt,
  cycleMoney,
  expectedProfit,
}) {
  return (
    <S.PropertyLayoutItem>
      <S.LayoutTop>
        <S.LayoutTopLeft>
          <img src={`Portfolio/Insurance.png`} alt="img" />
          <div>
            <div>{title}</div>
          </div>
        </S.LayoutTopLeft>
        <S.LayoutTopRight>총 납입 금액: {totalPrice} (원)</S.LayoutTopRight>
      </S.LayoutTop>

      <S.DivideLine />

      <S.LayoutBottom>
        <S.LayoutBottomitem>
          <S.LayoutBottomitemLeft>월 납부료</S.LayoutBottomitemLeft>
          <S.LayoutBottomitemRight>
            {cycleMoney.toLocaleString()}
          </S.LayoutBottomitemRight>
        </S.LayoutBottomitem>
        <S.LayoutBottomitem>
          <S.LayoutBottomitemLeft>납부 횟수</S.LayoutBottomitemLeft>
          <S.LayoutBottomitemRight>{cycleCnt}</S.LayoutBottomitemRight>
        </S.LayoutBottomitem>
        <S.LayoutBottomitem>
          <S.LayoutBottomitemLeft>보장 종목</S.LayoutBottomitemLeft>
          <S.LayoutBottomitemRight>{expectedProfit}</S.LayoutBottomitemRight>
        </S.LayoutBottomitem>
      </S.LayoutBottom>
    </S.PropertyLayoutItem>
  );
}

export default PortfolioInsuranceItem;
