import * as S from "../PortfolioProperty.style";
import SlideToggle from "react-slide-toggle";
import PortfolioInsuranceItem from "./PortfolioInsuranceItem";
import { useState } from "react";

function PortfolioInsurance() {
  const dummy = [
    {
      title: "상해보험",
      totalPrice: 900000,
      cycleCnt: 3,
      cycleMoney: 300000,
      expectedProfit: "교통사고, 건강검진",
    },
  ];

  const 총납입금액 = 900000;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <SlideToggle
        duration={500}
        collapsed={isCollapsed} // 토글 상태에 따라 초기 상태 설정
        whenReversedUseBackwardEase={false}
        render={({ toggle, setCollapsibleElement }) => (
          <S.ToggleLayout>
            <S.LayoutTop>
              <S.LayoutTopLeft>
                <img src="Insurance/Insurance.png" alt="img" />
                <div style={{ fontSize: "20px" }}>보험</div>
              </S.LayoutTopLeft>
              <S.LayoutTopRight>
                {dummy.length ? (
                  <div> 총 납입금액 : {총납입금액.toLocaleString()} (원)</div>
                ) : (
                  "가입 중인 보험이 없습니다."
                )}
              </S.LayoutTopRight>
            </S.LayoutTop>
            <div ref={setCollapsibleElement} style={{ paddingBottom: "5px" }}>
              {dummy.map((item) => {
                return (
                  <PortfolioInsuranceItem
                    title={item.title}
                    totalPrice={item.totalPrice}
                    cycleCnt={item.cycleCnt}
                    cycleMoney={item.cycleMoney}
                    expectedProfit={item.expectedProfit}
                  />
                );
              })}
            </div>
            {dummy.length ? (
              <S.ToggleBtn
                onClick={() => {
                  toggle();
                  toggleCollapse();
                }}
              >
                {isCollapsed ? "▼" : "▲"} {/* 토글 상태에 따라 아이콘 변경 */}
              </S.ToggleBtn>
            ) : null}
          </S.ToggleLayout>
        )}
      />
    </>
  );
}

export default PortfolioInsurance;
