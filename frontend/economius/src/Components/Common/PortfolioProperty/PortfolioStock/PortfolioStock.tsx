import * as S from "../PortfolioProperty.style";
import SlideToggle from "react-slide-toggle";
import PortforlioStockItem from "./PortfolioStockItem";
import { useState } from "react";

function PortfolioStock() {
  const dummy = [
    {
      imgPath: "samsung",
      title: "삼성전자",
      type: "반도체",
      cnt: 4,
      value: 210000,
      valueChange: 5,
      incDecAmount: 36000,
      expectedProfit: 12000,
    },
    {
      imgPath: "Aramco",
      title: "아람쿠",
      type: "석유",
      cnt: 7,
      value: 350000,
      valueChange: -3,
      incDecAmount: -40000,
      expectedProfit: 6000,
    },
  ];

  const 총자산가치 = 310000;
  const 자산변동 = 4;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  let percentStyleSpan;

  if (자산변동 > 0) {
    percentStyleSpan = <span style={{ color: "red" }}> (+{자산변동}%)</span>;
  } else if (자산변동 < 0) {
    percentStyleSpan = <span style={{ color: "blue" }}> ({자산변동}%)</span>;
  } else {
    percentStyleSpan = <span style={{ color: "black" }}> ({자산변동}%)</span>;
  }

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
                <img src="Portfolio/Stock.png" alt="img" />
                <div style={{ fontSize: "18px" }}>주식</div>
              </S.LayoutTopLeft>
              <S.LayoutTopRight>
                {dummy.length ? (
                  <div>
                    {" "}
                    총 자산가치 : {총자산가치.toLocaleString()} (원)
                    {percentStyleSpan}
                  </div>
                ) : (
                  "보유 중인 주식이 없습니다."
                )}
              </S.LayoutTopRight>
            </S.LayoutTop>
            <div ref={setCollapsibleElement} style={{ paddingBottom: "5px" }}>
              {dummy.map((item) => {
                return (
                  <PortforlioStockItem
                    imgPath={item.imgPath}
                    title={item.title}
                    type={item.type}
                    cnt={item.cnt}
                    value={item.value}
                    valueChange={item.valueChange}
                    incDecAmount={item.incDecAmount}
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

export default PortfolioStock;
