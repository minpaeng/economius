<<<<<<< HEAD
import * as S from "./Portfolio.style";
import PortfolioGold from "./PortfolioProperty/PortfolioGold/PortfolioGold";
import PortfolioMoney from "./PortfolioProperty/PortfolioMoney/PortfolioMoney";
import PortfolioStock from "./PortfolioProperty/PortfolioStock/PortfolioStock";
import PropertyChart from "./PortfolioProperty/PropertyChart";
import PortfolioSaving from "./PortfolioProperty/PortfolioSaving/PortfolioSaving";
import PortfolioRealEstate from "./PortfolioProperty/PortfolioRealEstate/PortfolioRealEstate";
import PortfolioInsurance from "./PortfolioProperty/PortfolioInsurance/PortfolioInsurance";
import { useRecoilValue } from "recoil";
import { PortfolioState } from "../../recoil/game/atom";
import { CallBackState } from "../../recoil/animation/atom";
import { useEffect } from "react";

function Portforlio({ setSideBarType }) {
  const portfolios = useRecoilValue(PortfolioState);
  const finishTurn = useRecoilValue(CallBackState);

  useEffect(() => {
    console.log(portfolios);
  }, [finishTurn]);

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
      <PortfolioStock setSideBarType={setSideBarType} />
      {/* 보험 토글 */}
      <PortfolioInsurance />
    </S.PortfolioMain>
  );
=======
import * as S from './Portfolio.style';
import PortfolioGold from './PortfolioProperty/PortfolioGold/PortfolioGold';
import PortfolioMoney from './PortfolioProperty/PortfolioMoney/PortfolioMoney';
import PortfolioStock from './PortfolioProperty/PortfolioStock/PortfolioStock';
import PropertyChart from './PortfolioProperty/PropertyChart';
import PortfolioSaving from './PortfolioProperty/PortfolioSaving/PortfolioSaving';
import PortfolioRealEstate from './PortfolioProperty/PortfolioRealEstate/PortfolioRealEstate';
import PortfolioInsurance from './PortfolioProperty/PortfolioInsurance/PortfolioInsurance';

import { useRecoilValue } from 'recoil';
import { PortfolioState } from '../../recoil/game/atom';
import { CallBackState } from '../../recoil/animation/atom';
import { useEffect } from 'react';

function Portforlio({ setSideBarType }) {
    const portfolios = useRecoilValue(PortfolioState);
    const finishTurn = useRecoilValue(CallBackState);

    useEffect(() => {
        console.log(portfolios);
    }, [finishTurn]);
    return (
        <S.PortfolioMain>
            <div
                style={{
                    fontSize: '20px',
                    margin: '20px 0px',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img src='Portfolio/Portfolio.png' alt='img' style={{ height: '30px' }} />
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
            <PortfolioStock setSideBarType={setSideBarType} />
            {/* 보험 토글 */}
            <PortfolioInsurance />
        </S.PortfolioMain>
    );
>>>>>>> c2d383553f80980f5a9f102d8da3cd38c2379f3d
}

export default Portforlio;
