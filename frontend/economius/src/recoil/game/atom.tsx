import {atom} from "recoil";
import sockjs from 'sockjs-client/dist/sockjs';
import {Stomp} from '@stomp/stompjs';

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
