import * as S from "../../PortfolioProperty/PortfolioProperty.style";
import SlideToggle from "react-slide-toggle";
import { useState } from "react";
import StockChangeItem from "./StockChangeItem";

function StockChange() {
  const dummy = [
    {
      imgPath: "koreaElectro",
      title: "대한전력",
      type: "",
      value: 100,
      valueChange: -3,
    },
    {
      imgPath: "Aramco",
      title: "아람쿠",
      type: "",
      value: 100,
      valueChange: 3,
    },
    { imgPath: "Posco", title: "포스쿠", type: "", value: 100, valueChange: 3 },
    {
      imgPath: "LGchemi",
      title: "IG화학",
      type: "",
      value: 100,
      valueChange: 7,
    },
    {
      imgPath: "pfizer",
      title: "화이지",
      type: "",
      value: 100,
      valueChange: -4,
    },
    {
      imgPath: "celltrion",
      title: "셀트리안",
      type: "",
      value: 100,
      valueChange: 5,
    },
    { imgPath: "Nike", title: "나이카", type: "", value: 100, valueChange: 3 },
    {
      imgPath: "CocaCola",
      title: "코카펩시",
      type: "",
      value: 100,
      valueChange: 1,
    },
    {
      imgPath: "airbnb",
      title: "AIR관광",
      type: "",
      value: 100,
      valueChange: -2,
    },
    { imgPath: "CJE&M", title: "CZ엔터", type: "", value: 100, valueChange: 3 },
    { imgPath: "KT", title: "K텔레콤", type: "", value: 100, valueChange: 3 },
    { imgPath: "MS", title: "M소프트", type: "", value: 100, valueChange: 3 },
    {
      imgPath: "CJdistribution",
      title: "대한운송",
      type: "",
      value: 100,
      valueChange: 3,
    },
    {
      imgPath: "hyundaiConstruct",
      title: "대현건설",
      type: "",
      value: 100,
      valueChange: 3,
    },
    { imgPath: "Lexus", title: "넥서스", type: "", value: 100, valueChange: 3 },
    {
      imgPath: "samsung",
      title: "삼성전자",
      type: "",
      value: 100,
      valueChange: 8,
    },
  ];

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
                <img src="Portfolio/Stock.png" alt="img" />
                <div style={{ fontSize: "28px" }}>주식</div>
              </S.LayoutTopLeft>
              <S.LayoutTopRight></S.LayoutTopRight>
            </S.LayoutTop>
            <div ref={setCollapsibleElement} style={{ paddingBottom: "5px" }}>
              {dummy.map((item) => {
                return (
                  <StockChangeItem
                    imgPath={item.imgPath}
                    title={item.title}
                    type={item.type}
                    value={item.value}
                    valueChange={item.valueChange}
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

export default StockChange;
