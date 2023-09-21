import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 현재 플레이어
export const NowPlayerState = atom<number>({
    key: 'NowPlayerState',
    default: 0, // 기본값
    effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 현재 플레이어 최종 위치
export const NowPlayerPositionState = atom<number>({
    key: 'NowPlayerPositionState',
    default: 0, // 기본값
    effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 캐릭터 이동 여부
export const IsMovingState = atom<boolean>({
    key: 'IsMovingState',
    default: false,
});

// 캐릭터 이동 거리
export const MoveDistState = atom<number>({
    key: 'MoveDistState',
    default: 0,
});

// 맵 애니메이션 칸
export const MapAnimationIndexState = atom<number>({
    key: 'MapAnimationIndexState',
    default: 0,
});

// 자산 모달 오픈 여부
export const IsModalOpenState = atom<boolean>({
    key: 'IsModalOpenState',
    default: false,
});
