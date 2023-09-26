import { useState } from "react";
import * as S from "./EconomicIndicator.style";
import ChartSection from "./EconomicIndicator/IndicatorSection/ChartSection";
import StockChange from "./EconomicIndicator/IndicatorSection/StockChange";
import BeforeBigEventNews from "./EconomicIndicator/News/BeforeBigEventNews";
import AfterBigEventNews from "./EconomicIndicator/News/AfterBigEventNews";

function EconomicIndicator({ setSideBarType }) {
  const [beforeBigEvent, setBeforeBigEvent] = useState(false);

  const beforeBigEventNewsList = [
    "[속보] 주식시장 과열",
    "[속보] 높은 부채 수준",
    "[속보] 불안정한 금융 시스템",
    "[속보] 높은 실업률",
    "[속보] 물가 불안정",
  ];

  const BigEventNews = [
    {
      issueId: 16,
      name: "한강의 기적",
      type: "BOOM",
      country: "한국",
      year: "1962",
      description:
        "대한민국이.수출 중심 경제 모델과 기술 혁신을 기반으로 빠르게 성장하여 세계에 인상적인 성과를 이뤘습니다. 대한민국을 선진국으로 발전시키는 데 기여했습니다.",
      url: "https://economius.s3.ap-northeast-2.amazonaws.com/%EA%B2%BD%EC%A0%9C_%EC%9D%B4%EB%B2%A4%ED%8A%B8_%EC%98%88%EC%8B%9C.png",
      currentAssetChanges: [
        {
          issueStockId: 285,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "금리",
          assetId: null,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[금리] 경제 안정과 미래에 대한 긍정적인 전망으로 금 값도 상승했습니다.",
        },
        {
          issueStockId: 286,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "금",
          assetId: null,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[금] 경제 안정과 미래에 대한 긍정적인 전망으로 금 값도 상승했습니다.",
        },
        {
          issueStockId: 287,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "부동산",
          assetId: null,
          stockType: null,
          changeRate: "UPPER",
          changeReason:
            "[부동산] 도시화와 산업화로 인해 특히 도시 부동산 가격이 급등했습니다.",
        },
        {
          issueStockId: 288,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 1,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][석유] 산업화와 경제 성장과 함께 석유 수요가 증가했습니다.",
        },
        {
          issueStockId: 289,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 2,
          stockType: null,
          changeRate: "UP",
          changeReason: "[주식][전기] 산업화와 함께 전기 수요가 증가했습니다.",
        },
        {
          issueStockId: 290,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 3,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][화학] 경제 성장과 함께 화학 제품 수요가 증가했습니다.",
        },
        {
          issueStockId: 291,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 4,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][철강] 경제 성장과 함께 철강 수요가 증가했습니다.",
        },
        {
          issueStockId: 292,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 5,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][제약] 경제 성장과 함께 보건 의료 서비스에 대한 수요와 투자가 증가했습니다.",
        },
        {
          issueStockId: 293,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 6,
          stockType: null,
          changeRate: "NO_CHANGE",
          changeReason:
            "[주식][바이오] 이 기간에는 바이오 산업이 크게 발전하지는 않았지만, 장기적으로 봤을 때 상승세를 보였습니다.",
        },
        {
          issueStockId: 294,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 7,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][패션] 경제의 회복과 사람들의 생활 수준 향상에 따른 패션 관련 소비 증가했습니다.",
        },
        {
          issueStockId: 295,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 8,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][식품] 인구 증가와 생활 수준의 향상으로 식품 산업이 성장했습니다.",
        },
        {
          issueStockId: 296,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 9,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][자동차] 자동차는 한국의 주요 수출 상품 중 하나로 성장했습니다.",
        },
        {
          issueStockId: 297,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 10,
          stockType: null,
          changeRate: "UPPER",
          changeReason:
            "[주식][반도체] 기술 발전과 글로벌 수요 증가로 반도체 산업이 빠르게 성장했습니다.",
        },
        {
          issueStockId: 298,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 11,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][운송] 경제 활동 증가에 따라 운송 산업이 활발해졌습니다.",
        },
        {
          issueStockId: 299,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 12,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][건설] 도시화와 인프라 구축으로 건설 산업이 활성화되었습니다.",
        },
        {
          issueStockId: 300,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 13,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][통신] 기술 발전과 정보화 사회로 통신 산업이 성장했습니다.",
        },
        {
          issueStockId: 301,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 14,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][소프트웨어] IT 산업의 발전에 따라 소프트웨어 관련 주식도 상승했습니다.",
        },
        {
          issueStockId: 302,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 15,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][관광] 경제 성장과 소득 증가로 내외국인의 관광 활동이 활발해졌습니다.",
        },
        {
          issueStockId: 303,
          issueId: 16,
          issueName: "한강의 기적",
          type: "BOOM",
          assetType: "주식",
          assetId: 16,
          stockType: null,
          changeRate: "UP",
          changeReason:
            "[주식][엔터테인먼트] 경제의 회복과 함께 엔터테인먼트 산업도 성장했습니다.",
        },
      ],
    },
  ];

  const NewsList = [];

  for (let i = 0; i < BigEventNews[0].currentAssetChanges.length; i++) {
    if (i < 4) {
      NewsList.push(BigEventNews[0].currentAssetChanges[i].changeReason);
    } else {
      NewsList[3] += `${BigEventNews[0].currentAssetChanges[i].changeReason}\n`;
    }
  }

  console.log(NewsList);

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
      {/* <div style={{ fontSize: "18px", marginTop: "8px" }}>경제 뉴스</div> */}
      <div
        style={{
          fontSize: "20px",
          marginTop: "8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="EconomicIndicator/EconomicNews.png"
          alt="img"
          style={{ height: "30px", marginRight: "5px" }}
        />
        <span>경제 뉴스</span>
      </div>
      {beforeBigEvent ? (
        <BeforeBigEventNews News={beforeBigEventNewsList} />
      ) : (
        <AfterBigEventNews News={NewsList} />
      )}

      <div
        style={{
          fontSize: "20px",
          marginTop: "8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="EconomicIndicator/Indicator.png"
          alt="img"
          style={{ height: "30px", marginRight: "5px" }}
        />
        <span>경제 지표</span>
      </div>
      {/* 금리 차트 */}
      <ChartSection data={interestRateData} />
      {/* 금 차트 */}

      <ChartSection data={goldData} />

      {/* 부동산 차트 */}

      <ChartSection data={RealEstateData} />

      {/* 주식 리스트 */}
      <StockChange setSideBarType={setSideBarType} />
    </S.EconomicIndicatorMain>
  );
}

export default EconomicIndicator;
