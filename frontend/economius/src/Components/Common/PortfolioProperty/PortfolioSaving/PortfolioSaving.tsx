import * as S from "../PortfolioProperty.style";
import SlideToggle from "react-slide-toggle";
import PortfolioSavingItem from "./PortfolioSavingItem";
import { useState } from "react";

function PortfolioSaving() {
  const dummy = [
    {
      title: "신한은행",
      rate: 12,
      currentCycle: 2,
      cycleCnt: 3,
      cycleMoney: 300000,
      value: 600000,
      expectedProfit: 1000000,
    },
  ];

  const 총자산가치 = 600000;

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
                <img src="Portfolio/Saving.png" alt="img" />
                <div style={{ fontSize: "20px" }}>적금</div>
              </S.LayoutTopLeft>
              <S.LayoutTopRight>
                {dummy.length ? (
                  <div> 총 자산가치 : {총자산가치.toLocaleString()} (원)</div>
                ) : (
                  "보유 중인 적금이 없습니다."
                )}
              </S.LayoutTopRight>
            </S.LayoutTop>
            <div ref={setCollapsibleElement} style={{ paddingBottom: "5px" }}>
              {dummy.map((item) => {
                return (
                  <PortfolioSavingItem
                    title={item.title}
                    rate={item.rate}
                    cycleCnt={item.cycleCnt}
                    currentCycle={item.currentCycle}
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

export default PortfolioSaving;
