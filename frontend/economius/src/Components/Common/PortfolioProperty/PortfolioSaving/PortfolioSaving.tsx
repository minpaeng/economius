import * as S from "../PortfolioProperty.style";
import SlideToggle from "react-slide-toggle";
import PortfolioSavingItem from "./PortfolioSavingItem";
import { useState } from "react";

function PortfolioSaving({ totalPrice, amount, savingList }) {
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
                {totalPrice ? (
                  <div> 총 자산가치 : {totalPrice.toLocaleString()} (원)</div>
                ) : (
                  "보유 중인 적금이 없습니다."
                )}
              </S.LayoutTopRight>
            </S.LayoutTop>
            <div ref={setCollapsibleElement} style={{ paddingBottom: "5px" }}>
              {savingList.map((item, idx) => {
                return (
                  <PortfolioSavingItem
                    key={idx}
                    title={item.name}
                    rate={item.rate}
                    cycleCnt={item.finishCount}
                    currentCycle={item.currentCount}
                    cycleMoney={item.monthlyDeposit}
                    currentPrice={item.currentPrice}
                  />
                );
              })}
            </div>
            {savingList.length ? (
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
