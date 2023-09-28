import * as S from "../PortfolioProperty.style";

function PortfolioGold({ totalPrice, amount, earningPrice, earningRate }) {
  let percentStyleSpan;

  if (earningRate > 0) {
    percentStyleSpan = <span style={{ color: "red" }}> (+{earningRate}%)</span>;
  } else if (earningRate < 0) {
    percentStyleSpan = <span style={{ color: "blue" }}> ({earningRate}%)</span>;
  } else {
    percentStyleSpan = (
      <span style={{ color: "black" }}> ({earningRate}%)</span>
    );
  }

  return (
    <>
      {amount ? (
        <S.PropertyLayout
          style={{ padding: "8px 12px 5px 12px", margin: "8px 0px" }}
        >
          <S.LayoutTop>
            <S.LayoutTopLeft>
              <img
                src={`Gold/goldbar.png`}
                alt="img"
                style={{ width: "30px", height: "30px" }}
              />

              <div style={{ fontSize: "20px" }}>금</div>
            </S.LayoutTopLeft>
            <S.LayoutTopRight>수량: {amount}개</S.LayoutTopRight>
          </S.LayoutTop>

          <S.DivideLine />

          <S.LayoutBottom>
            <S.LayoutBottomitem>
              <S.LayoutBottomitemLeft>총 자산가치</S.LayoutBottomitemLeft>
              <S.LayoutBottomitemRight>
                {totalPrice.toLocaleString()}
                {percentStyleSpan}
              </S.LayoutBottomitemRight>
            </S.LayoutBottomitem>
            <S.LayoutBottomitem>
              <S.LayoutBottomitemLeft>증감액</S.LayoutBottomitemLeft>
              <S.LayoutBottomitemRight>
                {earningPrice.toLocaleString()}
              </S.LayoutBottomitemRight>
            </S.LayoutBottomitem>
          </S.LayoutBottom>
        </S.PropertyLayout>
      ) : (
        <S.ToggleLayout>
          <S.LayoutTop>
            <S.LayoutTopLeft>
              <img src="Gold/goldbar.png" alt="img" />
              <div style={{ fontSize: "28px" }}>금</div>
            </S.LayoutTopLeft>
            <S.LayoutTopRight>보유 중인 금이 없습니다.</S.LayoutTopRight>
          </S.LayoutTop>
        </S.ToggleLayout>
      )}
    </>
  );
}
export default PortfolioGold;
