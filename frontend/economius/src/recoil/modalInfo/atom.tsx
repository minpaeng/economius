import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 모달 정보 스피너 플래그
export const ShowSpinnerState = atom({
    key: 'ShowSpinnerState',
    default: false,
});

// 월말정산 모달 정보
export const MonthlyInfoState = atom({
    key: 'MonthlyInfoState',
    default: {
        player: 0,
        salary: 0,
        savingFinishBenefit: 0,
        tax: 0,
        savingsPrice: 0,
        insurancePrice: 0,
        totalIncome: 0,
        money: 0,
    },
});

// 주식 모달 정보
export const StockInfoState = atom({
    key: 'StockInfoState',
    default: {},
});

// 부동산 모달 정보
export const RealEstateInfoState = atom({
    key: 'TradeRealEstateState',
    default: {
        buildingId: null,
        buildingPrice: null,
        changeAmount: null,
        visitor: null,
        owner: null,
    },
});

// 금 거래소 모달 정보
export const GoldInfoState = atom({
    key: 'GoldInfoState',
    default: {},
});

// 보험 모달 정보
export const InsuranceInfoState = atom({
    key: 'InsuranceInfoState',
    default: {},
});

// 은행 모달 정보
export const BankInfoState = atom({
    key: 'BankInfoState',
    default: {
        player: null,
        money: null,
        have: null,
        name: null,
        monthlyDeposit: null,
        currentPrice: null,
        currentCount: null,
        finishCount: null,
        rate: null,
    },
});

// 찬스 카드 모달 정보
export const ChanceCardInfoState = atom({
    key: 'ChanceCardInfoState',
    default: {
        moneyCard: null,
        name: null,
        description: null,
        eventValue: null,
        url: null,
    },
});
