import * as S from "./EconomicIndicator.style";
import ChartSection from "./EconomicIndicator/IndicatorSection/ChartSection";
import StockChange from "./EconomicIndicator/IndicatorSection/StockChange";

function EconomicIndicator() {
  const interestRateData = {
    imgPath: "interestRate",
    title: "금리",
    currentValue: 5,
    changeValue: 2,
    AllData: [
      { turn: 1, price: 100 },
      { turn: 2, price: 150 },
      { turn: 3, price: 120 },
      { turn: 4, price: 130 },
      { turn: 5, price: 210 },
      { turn: 6, price: 180 },
      { turn: 7, price: 185 },
      { turn: 8, price: 180 },
      { turn: 9, price: 177 },
      { turn: 10, price: 190 },
      { turn: 11, price: 150 },
      { turn: 12, price: 115 },
      { turn: 13, price: 155 },
      { turn: 14, price: 109 },
      { turn: 15, price: 120 },
    ],
  };

  const goldData = {
    imgPath: "goldbar",
    title: "금",
    currentValue: 5,
    changeValue: 2,
    AllData: [
      { turn: 1, price: 100 },
      { turn: 2, price: 150 },
      { turn: 3, price: 120 },
      { turn: 4, price: 130 },
      { turn: 5, price: 210 },
      { turn: 6, price: 180 },
      { turn: 7, price: 185 },
      { turn: 8, price: 180 },
      { turn: 9, price: 177 },
      { turn: 10, price: 190 },
      { turn: 11, price: 150 },
      { turn: 12, price: 115 },
      { turn: 13, price: 155 },
      { turn: 14, price: 109 },
      { turn: 15, price: 120 },
    ],
  };

  const RealEstateData = {
    imgPath: "RealEstate",
    title: "부동산",
    currentValue: 5,
    changeValue: 2,
    AllData: [
      { turn: 1, price: 100 },
      { turn: 2, price: 150 },
      { turn: 3, price: 120 },
      { turn: 4, price: 130 },
      { turn: 5, price: 210 },
      { turn: 6, price: 180 },
      { turn: 7, price: 185 },
      { turn: 8, price: 180 },
      { turn: 9, price: 177 },
      { turn: 10, price: 190 },
      { turn: 11, price: 150 },
      { turn: 12, price: 115 },
      { turn: 13, price: 155 },
      { turn: 14, price: 109 },
      { turn: 15, price: 120 },
    ],
  };

  return (
    <S.EconomicIndicatorMain>
      {/* 경제 뉴스 */}
      <div>경제 뉴스</div>
      {/* 금리 차트 */}
      <ChartSection data={interestRateData} />
      {/* 금 차트 */}

      <ChartSection data={goldData} />

      {/* 부동산 차트 */}

      <ChartSection data={RealEstateData} />

      {/* 주식 리스트 */}
      <StockChange />
    </S.EconomicIndicatorMain>
  );
}

export default EconomicIndicator;
