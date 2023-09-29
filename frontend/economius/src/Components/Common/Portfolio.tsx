import * as S from "./Portfolio.style";
import PortfolioGold from "./PortfolioProperty/PortfolioGold/PortfolioGold";
import PortfolioMoney from "./PortfolioProperty/PortfolioMoney/PortfolioMoney";
import PortfolioStock from "./PortfolioProperty/PortfolioStock/PortfolioStock";
import PropertyChart from "./PortfolioProperty/PropertyChart";
import PortfolioSaving from "./PortfolioProperty/PortfolioSaving/PortfolioSaving";
import PortfolioRealEstate from "./PortfolioProperty/PortfolioRealEstate/PortfolioRealEstate";
import PortfolioInsurance from "./PortfolioProperty/PortfolioInsurance/PortfolioInsurance";
import { useRecoilValue } from "recoil";
import {
  PortfolioState,
  ClickUserPortfolioState,
} from "../../recoil/game/atom";
// import { CallBackState } from "../../recoil/animation/atom";
// import { useEffect } from "react";

function Portforlio({ setSideBarType }) {
  // const finishTurn = useRecoilValue(CallBackState);

  const userId = useRecoilValue(ClickUserPortfolioState);
  const portfolios = useRecoilValue(PortfolioState) || {
    "1": {
      player: 1,
      money: 498700000,
      totalMoney: 500000000,
      gold: {
        totalPrice: 200000,
        amount: 2,
        earningPrice: 200000,
        earningRete: 0,
      },
      savings: {
        totalPrice: 300000,
        amount: 1,
        savings: {
          "3": {
            bankId: 3,
            name: "onebank",
            monthlyDeposit: 300000,
            currentPrice: 300000,
            currentCount: 1,
            finishCount: 3,
            rate: 3,
          },
          "2": {
            bankId: 2,
            name: "궁민",
            monthlyDeposit: 300000,
            currentPrice: 300000,
            currentCount: 1,
            finishCount: 3,
            rate: 3,
          },
        },
      },
      buildings: {
        totalPrice: 500000,
        earningRate: 0,
        earningPrice: 0,
        amount: 1,
        building: {
          "1": {
            buildingId: 1,
            buildingName: "restaurant",
            buyPrice: 5000000,
            building: {
              name: "restaurant",
              ownerId: 1,
              price: 5000000,
              priceHistory: [5000000],
              rate: 0,
              rateHistory: [0],
              buildingFee: 500000,
            },
          },
        },
      },
      stocks: {
        totalPrice: 64000,
        // TODO: 이거 왜 0 이지?
        earningRate: 0,
        earningPrice: 66560,
        amount: 2,
        stocks: {
          "3": {
            costPerStock: 32000,
            amount: 2,
            totalCost: 64000,
            earningRate: 4,
            earningPrice: 66560,
            stock: {
              stockId: 3,
              name: "포스쿠",
              stockIndustryId: 2,
              companyCategory: "소재",
              companySubCategory: "철강",
              owners: {
                "1": 2,
                "2": 0,
                "3": 0,
                "4": 0,
              },
              remainingAmount: 98,
              price: 33280,
              rate: 4,
              priceHistory: [
                {
                  openingPrice: 32000,
                  closingPrice: 33280,
                  highPrice: 33280,
                  lowPrice: 32000,
                },
              ],
              rateHistory: [4, 0],
            },
          },
        },
      },
      insurances: {
        totalPrice: 300000,
        amount: 1,
        insurance: {
          "2": {
            insuranceId: 2,
            category: "HS",
            categoryCode: "S",
            productCode: "HS",
            productName: "상해특약보험",
            guaranteeRate: 70,
            monthlyDeposit: 300000,
          },
        },
      },
    },
    "2": {
      player: 2,
      money: 500000000,
      totalMoney: 500000000,
      gold: {
        totalPrice: 0,
        amount: 0,
        earningPrice: 0,
        earningRete: 0,
      },
      savings: {
        totalPrice: 0,
        amount: 0,
        savings: null,
      },
      buildings: {
        totalPrice: 0,
        earningRate: 0,
        earningPrice: 0,
        amount: 0,
        building: null,
      },
      stocks: {
        totalPrice: 0,
        earningRate: 0,
        earningPrice: 0,
        amount: 0,
        stocks: null,
      },
      insurances: {
        totalPrice: 0,
        amount: 0,
        insurance: null,
      },
    },
    "3": {
      player: 3,
      money: 500000000,
      totalMoney: 500000000,
      gold: {
        totalPrice: 0,
        amount: 0,
        earningPrice: 0,
        earningRete: 0,
      },
      savings: {
        totalPrice: 0,
        amount: 0,
        savings: null,
      },
      buildings: {
        totalPrice: 0,
        earningRate: 0,
        earningPrice: 0,
        amount: 0,
        building: null,
      },
      stocks: {
        totalPrice: 0,
        earningRate: 0,
        earningPrice: 0,
        amount: 0,
        stocks: null,
      },
      insurances: {
        totalPrice: 0,
        amount: 0,
        insurance: null,
      },
    },
    "4": {
      player: 4,
      money: 500000000,
      totalMoney: 500000000,
      gold: {
        totalPrice: 0,
        amount: 0,
        earningPrice: 0,
        earningRete: 0,
      },
      savings: {
        totalPrice: 0,
        amount: 0,
        savings: null,
      },
      buildings: {
        totalPrice: 0,
        earningRate: 0,
        earningPrice: 0,
        amount: 0,
        building: null,
      },
      stocks: {
        totalPrice: 0,
        earningRate: 0,
        earningPrice: 0,
        amount: 0,
        stocks: null,
      },
      insurances: {
        totalPrice: 0,
        amount: 0,
        insurance: null,
      },
    },
  };
  // let portfolio;

  // useEffect(() => {}, [finishTurn]);

  function objectToArray(obj) {
    if (!obj) {
      return [];
    }
    return Object.values(obj);
  }

  const savingList = objectToArray(portfolios[userId].savings.savings);
  const buildingList = objectToArray(portfolios[userId].buildings.building);
  const stockList = objectToArray(portfolios[userId].stocks.stocks);
  const insuranceList = objectToArray(portfolios[userId].insurances.insurance);

  // useEffect(() => {
  //   console.log(portfolios[userId]);
  //   console.log(userId);
  // }, [userId]);

  return (
    <S.PortfolioMain>
      <div
        style={{
          fontSize: "20px",
          margin: "20px 0px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="Portfolio/Portfolio.png"
          alt="img"
          style={{ height: "30px" }}
        />
        <span>{userId} 님의 포트폴리오</span>
      </div>
      <PropertyChart
        money={portfolios[userId].money}
        gold={portfolios[userId].gold.totalPrice}
        buildings={portfolios[userId].buildings.totalPrice}
        savings={portfolios[userId].savings.totalPrice}
        stocks={portfolios[userId].stocks.totalPrice}
      />
      {/* 현금 */}
      <PortfolioMoney money={portfolios[userId].money} />
      {/* 금 */}
      <PortfolioGold
        totalPrice={portfolios[userId].gold.totalPrice}
        amount={portfolios[userId].gold.amount}
        earningPrice={portfolios[userId].gold.earningPrice}
        earningRate={portfolios[userId].gold.earningRete}
      />
      {/* 적금 */}
      <PortfolioSaving
        totalPrice={portfolios[userId].savings.totalPrice}
        amount={portfolios[userId].savings.amount}
        savingList={savingList}
      />
      {/* 부동산 */}
      <PortfolioRealEstate
        totalPrice={portfolios[userId].buildings.totalPrice}
        earningRate={portfolios[userId].buildings.earningRate}
        earningPrice={portfolios[userId].buildings.earningPrice}
        buildingList={buildingList}
      />
      {/* 주식 토글 */}
      <PortfolioStock
        setSideBarType={setSideBarType}
        userId={userId}
        earningRate={portfolios[userId].stocks.earningRate}
        earningPrice={portfolios[userId].stocks.earningPrice}
        stockList={stockList}
      />
      {/* 보험 토글 */}
      <PortfolioInsurance
        totalPrice={portfolios[userId].insurances.totalPrice}
        insuranceList={insuranceList}
      />
    </S.PortfolioMain>
  );
}

export default Portforlio;
