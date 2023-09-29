import SideStockOwnerChart from "./EconomicIndicator/SideStock/SideStockOwnerChart";
import SideStockPrice from "./EconomicIndicator/SideStock/SideStockPrice";
import SideStockTitle from "./EconomicIndicator/SideStock/SideStockTitle";
import StockGraph from "./StockGraph";

import * as S from "./SideBar.style";

import { useRecoilState } from "recoil";
import { SideBarTypeState } from "/src/recoil/animation/atom";
import { useRecoilValue } from "recoil";
import { StockState } from "../../recoil/game/atom";

function StockCheck({ clickStockId, isPortfolio, setIsPortfolio }) {
  const [sideBarType, setSideBarType] = useRecoilState(SideBarTypeState);

  function makeStockGraphData(stockPriceHistoryData) {
    const graphData = [];
    let index = 0;
    for (index; index < stockPriceHistoryData.length; index++) {
      graphData.push({
        turn: index + 1,
        open: stockPriceHistoryData[index].openingPrice,
        high: stockPriceHistoryData[index].highPrice,
        low: stockPriceHistoryData[index].lowPrice,
        close: stockPriceHistoryData[index].closingPrice,
      });
    }

    for (index; index < 20; index++) {
      graphData.push({
        turn: index + 1,
        open: null,
        high: null,
        low: null,
        close: null,
      });
    }

    return graphData;
  }

  function handleGoBack() {
    if (isPortfolio) {
      setSideBarType("portfolio");
    } else {
      setSideBarType("economicIndicator");
    }
  }

  const stocks = useRecoilValue(StockState);

  const imgPath = stocks[clickStockId].stockId;
  const name = stocks[clickStockId].name;
  const companyCategory = stocks[clickStockId].companyCategory;
  const companySubCategory = stocks[clickStockId].companySubCategory;
  const price = stocks[clickStockId].price;
  const rate = stocks[clickStockId].rate;
  const priceHistory = stocks[clickStockId].priceHistory;
  const owners = [stocks[clickStockId].owners];
  const remainingAmount = stocks[clickStockId].remainingAmount;

  return (
    <div>
      {/* // 제목 */}
      <SideStockTitle imgpath={imgPath} name={name} />
      {/* // 업종 & 가격 */}
      <div style={{ width: "90%", margin: "auto" }}>
        <SideStockPrice
          companyCategory={companyCategory}
          companySubCategory={companySubCategory}
          price={price}
          rate={rate}
        />
        <hr style={{ height: "1px", backgroundColor: "gray" }} />
        {/* // 주가차트 */}
        <div style={{ padding: "16px 12px 0px 12px" }}>▶ 주가 차트</div>
        <StockGraph data={makeStockGraphData(priceHistory)} />
        <hr style={{ height: "1px", backgroundColor: "gray" }} />

        {/* // 유저 주식 보유 차트 */}
        <div style={{ padding: "16px 12px 0px 12px" }}>▶ 주식 보유 비율</div>
        <SideStockOwnerChart
          remainingAmount={remainingAmount}
          owners={owners}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <S.backBtn onClick={handleGoBack}>뒤로가기</S.backBtn>
        </div>
      </div>
    </div>
  );
}
export default StockCheck;
