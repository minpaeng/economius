import SideStockOwnerChart from "./EconomicIndicator/SideStock/SideStockOwnerChart";
import SideStockPrice from "./EconomicIndicator/SideStock/SideStockPrice";
import SideStockTitle from "./EconomicIndicator/SideStock/SideStockTitle";
import StockGraph from "./StockGraph";

import * as S from "./SideBar.style";

import { useRecoilState } from "recoil";
import { SideBarTypeState } from "/src/recoil/animation/atom";

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

  const stocks = {
    1: {
      stockId: 1,
      name: "아람쿠",
      stockIndustryId: 1,
      companyCategory: "에너지",
      companySubCategory: "석유",
      owners: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      remainingAmount: 100,
      price: 12000,
      rate: 0,
      priceHistory: [
        {
          openingPrice: 12000,
          closingPrice: 12000,
          highPrice: 12000,
          lowPrice: 12000,
        },
      ],
      rateHistory: [1, 0],
    },
    2: {
      stockId: 2,
      name: "전력공사",
      stockIndustryId: 1,
      companyCategory: "에너지",
      companySubCategory: "전기",
      owners: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      remainingAmount: 100,
      price: 19080,
      rate: 6,
      priceHistory: [
        {
          openingPrice: 18000,
          closingPrice: 19080,
          highPrice: 19080,
          lowPrice: 18000,
        },
      ],
      rateHistory: [6, 0],
    },
    3: {
      stockId: 3,
      name: "lG화학",
      stockIndustryId: 2,
      companyCategory: "소재",
      companySubCategory: "화학",
      owners: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      remainingAmount: 100,
      price: 35640,
      rate: -1,
      priceHistory: [
        {
          openingPrice: 36000,
          closingPrice: 35640,
          highPrice: 36000,
          lowPrice: 35640,
        },
      ],
      rateHistory: [-1, 0],
    },
    4: {
      stockId: 4,
      name: "포스쿠",
      stockIndustryId: 2,
      companyCategory: "소재",
      companySubCategory: "철강",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 34560,
      rate: 8,
      priceHistory: [
        {
          openingPrice: 32000,
          closingPrice: 34560,
          highPrice: 34560,
          lowPrice: 32000,
        },
      ],
      rateHistory: [8, 0],
    },
    5: {
      stockId: 5,
      name: "화이지",
      stockIndustryId: 3,
      companyCategory: "의료",
      companySubCategory: "제약",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 42840,
      rate: 2,
      priceHistory: [
        {
          openingPrice: 42000,
          closingPrice: 42840,
          highPrice: 42840,
          lowPrice: 42000,
        },
      ],
      rateHistory: [2, 0],
    },
    6: {
      stockId: 6,
      name: "셀트리안",
      stockIndustryId: 3,
      companyCategory: "의료",
      companySubCategory: "바이오",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 36040,
      rate: 6,
      priceHistory: [
        {
          openingPrice: 34000,
          closingPrice: 36040,
          highPrice: 36040,
          lowPrice: 34000,
        },
      ],
      rateHistory: [6, 0],
    },
    7: {
      stockId: 7,
      name: "나이카",
      stockIndustryId: 4,
      companyCategory: "소비재",
      companySubCategory: "패션",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 22540,
      rate: -2,
      priceHistory: [
        {
          openingPrice: 23000,
          closingPrice: 22540,
          highPrice: 23000,
          lowPrice: 22540,
        },
      ],
      rateHistory: [-2, 0],
    },
    8: {
      stockId: 8,
      name: "콜라",
      stockIndustryId: 4,
      companyCategory: "소비재",
      companySubCategory: "식품",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 18190,
      rate: 7,
      priceHistory: [
        {
          openingPrice: 17000,
          closingPrice: 18190,
          highPrice: 18190,
          lowPrice: 17000,
        },
      ],
      rateHistory: [7, 0],
    },
    9: {
      stockId: 9,
      name: "넥서스",
      stockIndustryId: 5,
      companyCategory: "제조업",
      companySubCategory: "자동차",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 22310,
      rate: -3,
      priceHistory: [
        {
          openingPrice: 23000,
          closingPrice: 22310,
          highPrice: 23000,
          lowPrice: 22310,
        },
      ],
      rateHistory: [-3, 0],
    },
    10: {
      stockId: 10,
      name: "삼성전자",
      stockIndustryId: 5,
      companyCategory: "제조업",
      companySubCategory: "반도체",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 52500,
      rate: 5,
      priceHistory: [
        {
          openingPrice: 50000,
          closingPrice: 52500,
          highPrice: 52500,
          lowPrice: 50000,
        },
      ],
      rateHistory: [5, 0],
    },
    11: {
      stockId: 11,
      name: "대한운송",
      stockIndustryId: 6,
      companyCategory: "산업재",
      companySubCategory: "운송",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 35700,
      rate: 5,
      priceHistory: [
        {
          openingPrice: 34000,
          closingPrice: 35700,
          highPrice: 35700,
          lowPrice: 34000,
        },
      ],
      rateHistory: [5, 0],
    },
    12: {
      stockId: 12,
      name: "대현건설",
      stockIndustryId: 6,
      companyCategory: "산업재",
      companySubCategory: "건설",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 35640,
      rate: -1,
      priceHistory: [
        {
          openingPrice: 36000,
          closingPrice: 35640,
          highPrice: 36000,
          lowPrice: 35640,
        },
      ],
      rateHistory: [-1, 0],
    },
    13: {
      stockId: 13,
      name: "K텔레콤",
      stockIndustryId: 7,
      companyCategory: "IT",
      companySubCategory: "통신",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 32100,
      rate: 7,
      priceHistory: [
        {
          openingPrice: 30000,
          closingPrice: 32100,
          highPrice: 32100,
          lowPrice: 30000,
        },
      ],
      rateHistory: [7, 0],
    },
    14: {
      stockId: 14,
      name: "M소프트",
      stockIndustryId: 7,
      companyCategory: "IT",
      companySubCategory: "소프트웨어",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 45760,
      rate: 4,
      priceHistory: [
        {
          openingPrice: 44000,
          closingPrice: 45760,
          highPrice: 45760,
          lowPrice: 44000,
        },
      ],
      rateHistory: [4, 0],
    },
    15: {
      stockId: 15,
      name: "air관광",
      stockIndustryId: 8,
      companyCategory: "서비스",
      companySubCategory: "관광",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 19570,
      rate: 3,
      priceHistory: [
        {
          openingPrice: 19000,
          closingPrice: 19570,
          highPrice: 19570,
          lowPrice: 19000,
        },
      ],
      rateHistory: [3, 0],
    },
    16: {
      stockId: 16,
      name: "CZ엔터",
      stockIndustryId: 8,
      companyCategory: "서비스",
      companySubCategory: "엔터",
      owners: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
      },
      remainingAmount: 100,
      price: 22770,
      rate: -1,
      priceHistory: [
        {
          openingPrice: 23000,
          closingPrice: 22770,
          highPrice: 23000,
          lowPrice: 22770,
        },
      ],
      rateHistory: [-1, 0],
    },
  };

  const imgList = [
    "none",
    "Aramco",
    "koreaElectro",
    "LGchemi",
    "Posco",
    "pfizer",
    "celltrion",
    "Nike",
    "CocaCola",
    "Lexus",
    "samsung",
    "CJdistribution",
    "hyundaiConstruct",
    "KT",
    "MS",
    "airbnb",
    "CJE&M",
  ];

  const imgPath = imgList[clickStockId];
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
