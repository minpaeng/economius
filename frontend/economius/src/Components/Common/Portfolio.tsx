import * as S from './Portfolio.style';
import PortfolioGold from './PortfolioProperty/PortfolioGold/PortfolioGold';
import PortfolioMoney from './PortfolioProperty/PortfolioMoney/PortfolioMoney';
import PortfolioStock from './PortfolioProperty/PortfolioStock/PortfolioStock';
import PropertyChart from './PortfolioProperty/PropertyChart';
import PortfolioSaving from './PortfolioProperty/PortfolioSaving/PortfolioSaving';
import PortfolioRealEstate from './PortfolioProperty/PortfolioRealEstate/PortfolioRealEstate';
import PortfolioInsurance from './PortfolioProperty/PortfolioInsurance/PortfolioInsurance';
import { useRecoilValue } from 'recoil';
import { PortfolioState, ClickUserPortfolioState } from '../../recoil/game/atom';
import { RoomJoinUsersIdState, RoomJoinUsersNicknameState } from '../../recoil/animation/atom';
// import { useEffect } from "react";

function Portforlio({ setSideBarType }) {
    // const finishTurn = useRecoilValue(CallBackState);

    const userId = useRecoilValue(ClickUserPortfolioState);

    const portfolios = useRecoilValue(PortfolioState);

    const NickNameArr = useRecoilValue(RoomJoinUsersNicknameState);
    const UserIdArr = useRecoilValue(RoomJoinUsersIdState);

    function returnNick(Id) {
        const returnIdx = UserIdArr.indexOf(Id);
        return NickNameArr[returnIdx];
    }

    const NickName = returnNick(userId);

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
                <span>{NickName} 님의 포트폴리오</span>
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
            <PortfolioSaving totalPrice={portfolios[userId].savings.totalPrice} amount={portfolios[userId].savings.amount} savingList={savingList} />
            {/* 부동산 */}
            <PortfolioRealEstate
                totalPrice={portfolios[userId].buildings.totalPrice}
                earningRate={portfolios[userId].buildings.earningRate}
                // earningPrice={portfolios[userId].buildings.earningPrice}
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
                amount={portfolios[userId].insurances.amount}
                insuranceList={insuranceList}
            />
        </S.PortfolioMain>
    );
}

export default Portforlio;
