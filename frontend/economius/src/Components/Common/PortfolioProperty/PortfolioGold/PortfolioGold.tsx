import * as S from "../PortfolioProperty.style";

function PortfolioGold() {
  const dummy = {
    cnt: 4,
    value: 210000,
    valueChange: 5,
    incDecAmount: 36000,
    expectedProfit: 12000,
  };

  let percentStyleSpan;

  if (dummy.valueChange > 0) {
    percentStyleSpan = (
      <span style={{ color: "red" }}> (+{dummy.valueChange}%)</span>
    );
  } else if (dummy.valueChange < 0) {
    percentStyleSpan = (
      <span style={{ color: "blue" }}> ({dummy.valueChange}%)</span>
    );
  } else {
    percentStyleSpan = (
      <span style={{ color: "black" }}> ({dummy.valueChange}%)</span>
    );
  }

  return (
    <>
      {dummy.cnt ? (
        <S.PropertyLayout
          style={{ padding: "12px 12px 9px 12px", margin: "20px 0px" }}
        >
          <S.LayoutTop>
            <S.LayoutTopLeft>
              <img
                src={`Gold/goldbar.png`}
                alt="img"
                style={{ width: "50px", height: "50px" }}
              />

              <div style={{ fontSize: "28px" }}>금</div>
            </S.LayoutTopLeft>
            <S.LayoutTopRight>수량: {dummy.cnt}개</S.LayoutTopRight>
          </S.LayoutTop>

          <S.DivideLine />

          <S.LayoutBottom>
            <S.LayoutBottomitem>
              <S.LayoutBottomitemLeft>총 자산가치</S.LayoutBottomitemLeft>
              <S.LayoutBottomitemRight>
                {dummy.value.toLocaleString()}
                {percentStyleSpan}
              </S.LayoutBottomitemRight>
            </S.LayoutBottomitem>
            <S.LayoutBottomitem>
              <S.LayoutBottomitemLeft>증감액</S.LayoutBottomitemLeft>
              <S.LayoutBottomitemRight>
                {dummy.incDecAmount.toLocaleString()}
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
