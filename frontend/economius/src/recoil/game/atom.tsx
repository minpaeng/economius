import {atom} from "recoil";

export const PlayerIdState = atom({
    key: 'PlayerIdState',
    default: 1,
})

export const PortfolioState = atom({
    key: 'PortfolioState',
    default: null,
});

export const StockState = atom({
    key: 'StockState',
    default: null,
})

export const PredictionState = atom({
    key: 'PredictionState',
    default: null,
})