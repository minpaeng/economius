import * as S from "../../PortfolioProperty/PortfolioProperty.style";
import SlideToggle from "react-slide-toggle";
import ChartSectionItem from "./ChartSectionItem";
import { useState } from "react";

function ChartSection({ data }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  let percentStyleSpan;

  if (data?.changeValue > 0) {
    percentStyleSpan = (
      <span style={{ color: "red" }}> (+{data?.changeValue}%)</span>
    );
  } else if (data?.changeValue < 0) {
    percentStyleSpan = (
      <span style={{ color: "blue" }}> ({data?.changeValue}%)</span>
    );
  } else {
    percentStyleSpan = (
      <span style={{ color: "black" }}> ({data?.changeValue}%)</span>
    );
  }

  let layoutTopRight;

  if (data.title === "금리") {
    layoutTopRight = (
      <S.LayoutTopRight>
        현재금리 : {data.currentValue}
        {percentStyleSpan}
      </S.LayoutTopRight>
    );
  } else if (data.title === "금") {
    layoutTopRight = (
      <S.LayoutTopRight>
        가격 : {data.currentValue}
        {percentStyleSpan}
      </S.LayoutTopRight>
    );
  } else {
    layoutTopRight = (
      <S.LayoutTopRight>
        부동산 뭐라고 함? 뭐가 움직이는거 : {data.currentValue}
        {percentStyleSpan}
      </S.LayoutTopRight>
    );
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
                <img src={`EconomicIndicator/${data.imgPath}.png`} alt="img" />
                <div style={{ fontSize: "28px" }}>{data.title}</div>
              </S.LayoutTopLeft>
              {layoutTopRight}
            </S.LayoutTop>
            <div ref={setCollapsibleElement} style={{ paddingBottom: "5px" }}>
              <ChartSectionItem data={data.AllData} />
            </div>

            <S.ToggleBtn
              onClick={() => {
                toggle();
                toggleCollapse();
              }}
            >
              {isCollapsed ? "▼" : "▲"} {/* 토글 상태에 따라 아이콘 변경 */}
            </S.ToggleBtn>
          </S.ToggleLayout>
        )}
      />
    </>
  );
}

export default ChartSection;
