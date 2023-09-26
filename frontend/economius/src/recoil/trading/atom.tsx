import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 부동산 매수, 매도 여부
export const TradeRealEstateState = atom<boolean[]>({
    key: 'TradeRealEstateState',
    default: [false, false],
});

// 주식 매수, 매도 여부
export const TradeStockState = atom<boolean[]>({
    key: 'TradeStockState',
    default: [false, false],
});

// 금 매수, 매도 여부
export const TradeGoldState = atom<boolean[]>({
    key: 'TradeGoldState',
    default: [false, false],
});

// 은행 가입, 해지 여부
export const TradeBankState = atom<boolean[]>({
    key: 'TradeBankState',
    default: [false, false],
});

// 보험 가입, 해지 여부
export const TradeInsuranceState = atom<boolean[]>({
    key: 'TradeInsuranceState',
    default: [false, false, false, false],
});

// 보험 가입, 해지 확정
export const TradeInsuranceConfirmState = atom<boolean>({
    key: 'TradeInsuranceConfirmState',
    default: false,
});

// 매수량
export const BuyAmountState = atom<number>({
    key: 'BuyAmountState',
    default: 1,
});

// 매도량
export const SellAmountState = atom<number>({
    key: 'SellAmountState',
    default: 1,
});

export const StockDetailState = atom({
    key: 'StockDetailState',
    default: null,
})