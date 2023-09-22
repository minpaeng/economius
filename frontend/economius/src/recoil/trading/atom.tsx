import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 부동산 매수, 매도
export const TradeRealEstateState = atom<boolean[]>({
    key: 'TradeRealEstateState',
    default: [false, false],
});
