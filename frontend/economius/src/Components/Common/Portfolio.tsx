import * as S from "./Portfolio.style";
import PortfolioGold from "./PortfolioProperty/PortfolioGold/PortfolioGold";
import PortfolioMoney from "./PortfolioProperty/PortfolioMoney/PortfolioMoney";
import PortfolioStock from "./PortfolioProperty/PortfolioStock/PortfolioStock";
import PropertyChart from "./PortfolioProperty/PropertyChart";
import PortfolioSaving from "./PortfolioProperty/PortfolioSaving/PortfolioSaving";
import PortfolioRealEstate from "./PortfolioProperty/PortfolioRealEstate/PortfolioRealEstate";
import PortfolioInsurance from "./PortfolioProperty/PortfolioInsurance/PortfolioInsurance";

function Portforlio() {
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
        <span>지니어스 님의 포트폴리오</span>
      </div>
      <PropertyChart />
      {/* 현금 */}
      <PortfolioMoney />
      {/* 금 */}
      <PortfolioGold />
      {/* 적금 */}
      <PortfolioSaving />
      {/* 부동산 */}
      <PortfolioRealEstate />
      {/* 주식 토글 */}
      <PortfolioStock />
      {/* 보험 토글 */}
      <PortfolioInsurance />
    </S.PortfolioMain>
  );
}

export default Portforlio;
