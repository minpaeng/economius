import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 동전 효과 여부
export const CoinEffectState = atom({
    key: 'CoinEffectState',
    default: false,
});

// 동전 효과 번호
export const CoinEffectIndexState = atom({
    key: 'CoinEffectIndexState',
    default: 1,
});
