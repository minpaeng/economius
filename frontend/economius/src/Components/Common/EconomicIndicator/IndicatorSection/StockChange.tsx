import * as S from "../../PortfolioProperty/PortfolioProperty.style";
import SlideToggle from "react-slide-toggle";
import { useState } from "react";
import StockChangeItem from "./StockChangeItem";
import { useRecoilValue } from "recoil";
import { StockState } from "../../../../recoil/game/atom";

function StockChange({ setSideBarType }) {
  const stockData = useRecoilValue(StockState);

  function objectToArray(obj) {
    if (!obj) {
      return [];
    }
    return Object.values(obj);
  }

  const stockList = objectToArray(stockData);

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
                <div style={{ fontSize: "18px" }}>주식</div>
              </S.LayoutTopLeft>
              <S.LayoutTopRight></S.LayoutTopRight>
            </S.LayoutTop>
            <div ref={setCollapsibleElement} style={{ paddingBottom: "5px" }}>
              {stockList.map(
                ({ companySubCategory, name, price, rate, stockId }) => {
                  return (
                    <StockChangeItem
                      key={stockId}
                      id={stockId}
                      imgPath={stockId}
                      title={name}
                      type={companySubCategory}
                      value={price}
                      valueChange={rate}
                      setSideBarType={setSideBarType}
                    />
                  );
                }
              )}
            </div>
            {stockList.length ? (
              <S.ToggleBtn
                style={{ padding: 0 }}
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
