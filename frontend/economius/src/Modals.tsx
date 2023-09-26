import { useEffect } from 'react';
import MonthlyCalculate from './Components/Modals/MonthlyCalculate';
import Stock from './Components/Modals/Stock';
import InstallmentSaving from './Components/Modals/InstallmentSaving';
import Insurance from './Components/Modals/Insurance';
import RealEstate from './Components/Modals/RealEstate';
import Prediction from './Components/Modals/Prediction';
import FinanceCenter from './Components/Modals/FinanceCenter';
import ChanceCard from './Components/Modals/ChanceCard';
import BigEvent from './Components/Modals/BigEvent';
import Bankrupt from './Components/Modals/Bankrupt';
import BeforeBankrupt from './Components/Modals/BeforeBankrupt';
import GoldModal from './Components/Modals/Gold';
import { useRecoilState } from 'recoil';
import { NowPlayerPositionState, IsModalOpenState, MonthlyModalOpenState, IsMovingState } from './recoil/animation/atom';

const modalComponent = {
    1: Stock,
    2: InstallmentSaving,
    3: Stock,
    4: RealEstate,
    5: Stock,
    6: Insurance,
    7: Stock,
    8: Stock,
    9: Stock,
    10: InstallmentSaving,
    11: Stock,
    12: ChanceCard,
    13: Stock,
    14: RealEstate,
    15: Stock,
    16: FinanceCenter,
    17: Stock,
    18: InstallmentSaving,
    19: Stock,
    20: ChanceCard,
    21: Stock,
    22: RealEstate,
    23: Stock,
    24: Prediction,
    25: Stock,
    26: Insurance,
    27: Stock,
    28: ChanceCard,
    29: Stock,
    30: GoldModal,
    31: Stock,
};
let SelectedModal;

function Modals() {
    const [nowPlayerPosition, setNowPlayerPosition] = useRecoilState(NowPlayerPositionState);
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const [monthlyModalOpen, setMonthlyModalOpen] = useRecoilState(MonthlyModalOpenState);
    const [isMoving, setIsMoving] = useRecoilState(IsMovingState);
    SelectedModal = modalComponent[nowPlayerPosition];

    return <>{!isMoving ? <>{monthlyModalOpen ? <MonthlyCalculate /> : isModalOpen ? SelectedModal && <SelectedModal /> : null}</> : null}</>;
}

export default Modals;
