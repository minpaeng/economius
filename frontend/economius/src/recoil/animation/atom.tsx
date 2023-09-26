import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 현재 방 번호
export const RoomIdState = atom<number>({
  key: "RoomIdState",
  default: 1, // 기본값
  effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 현재 플레이어
export const UseridState = atom({
  key: "UseridState",
  default: "a", // 기본값
  // effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 현재 플레이어
export const NowPlayerState = atom<number>({
    key: 'NowPlayerState',
    default: 0, // 기본값
    // effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 현재 플레이어 최종 위치
export const NowPlayerPositionState = atom<number>({
  key: "NowPlayerPositionState",
  default: 0, // 기본값
  effects_UNSTABLE: [persistAtom],
});

// 이동 카드 번호
export const MovementCardsState = atom<number[]>({
  key: "MovementCardState",
  default: [1, 1, 1],
  effects_UNSTABLE: [persistAtom],
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

// 월말정산 모달 오픈 여부
export const MonthlyModalOpenState = atom<boolean>({
    key: 'MonthlyModalOpenState',
    default: false,
});

// 뉴스 클릭
export const NewsClickIdxState = atom<boolean>({
    key: 'NewsClickIdxState',
    default: null,
});

// 콜백 턴 종료
export const CallBackState = atom<boolean>({
    key: 'CallBackState',
    default: false,
});

// 주식 클릭

export const StockClickIdState = atom<number>({
  key: "StockClickIdState",
  default: null,
});
