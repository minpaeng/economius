import * as S from "./Portfolio.style";
import PortfolioGold from "./PortfolioProperty/PortfolioGold/PortfolioGold";
import PortfolioMoney from "./PortfolioProperty/PortfolioMoney/PortfolioMoney";
import PortfolioStock from "./PortfolioProperty/PortfolioStock/PortfolioStock";
import PropertyChart from "./PortfolioProperty/PropertyChart";
import PortfolioSaving from "./PortfolioProperty/PortfolioSaving/PortfolioSaving";
import PortfolioRealEstate from "./PortfolioProperty/PortfolioRealEstate/PortfolioRealEstate";

function Portforlio() {
  return (
    <S.PortfolioMain>
      <div
        style={{
          fontSize: "28px",
          margin: "20px 0px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="Portfolio/Portfolio.png"
          alt="img"
          style={{ height: "50px" }}
        />
        <span>지니어스 님의 포트폴리오</span>
      </div>
      <PropertyChart></PropertyChart>
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
    </S.PortfolioMain>
  );
}

export default Portforlio;
