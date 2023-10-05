import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { PlayerToRollState } from '../game/atom';
const { persistAtom } = recoilPersist();

// 시작 결과 반환
export const StartReturnState = atom<boolean>({
    key: 'StartReturnState',
    default: false, // 기본값
    // effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 게임 내부 내턴 정보 저장
export const MyTurnState = atom<number>({
    key: 'MyTurnState',
    default: 1, // 기본값
    // effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 게임 시작 버튼 클릭 여부
export const GameButtonState = atom<boolean>({
    key: 'GameButtonState',
    default: false, // 기본값
    // effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

//  나가기 버튼 클릭 여부
export const RoomExitState = atom<boolean>({
    key: 'RoomExitState',
    default: false, // 기본값
    // effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 현재 방 번호
export const RoomIdState = atom<number>({
    key: 'RoomIdState',
    default: 2, // 기본값
    effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 현재 방장 번호
export const RoomHostState = atom<number>({
    key: 'RoomHostState',
    default: 0, // 기본값
    effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 현재 인원 수
export const RoomCountState = atom<number>({
    key: 'RoomCountState',
    default: 0, // 기본값
    effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// wait room 모달 오픈 여부
export const SetShowWaitRoomState = atom<boolean>({
    key: 'SetShowWaitRoomState',
    default: false, // 1이 호출
    // effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 방 참가 신청 여부
export const SetShowJoinState = atom<boolean>({
    key: 'SetShowJoinState',
    default: false, // 1이 호출
    // effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 방 참가 신청 여부
export const RoomJoinState = atom<number>({
    key: 'RoomJoinState',
    default: 0, // 1이 호출
    // effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

// 유저 아이디
export const UseridState = atom({
    key: 'UseridState',
    default: 'a', // 기본값
    // effects_UNSTABLE: [persistAtom], // 새로고침해도 유지
});

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
    effects_UNSTABLE: [persistAtom],
});

// 이동 카드 모달 여부
export const MovementCardOpenState = atom({
    key: 'MovementCardOpenState',
    default: true,
    effects_UNSTABLE: [persistAtom],
});

// 이동 카드 번호
export const MovementCardState = atom({
    key: 'MovementCardState',
    default: null,
    // effects_UNSTABLE: [persistAtom],
});

// 이동 카드 선택 확정 여부
export const MovementCardConfirmState = atom({
    key: 'MovementCardConfirmState',
    default: false,
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
    key: 'StockClickIdState',
    default: null,
});

// sideBarType

export const SideBarTypeState = atom<string>({
    key: 'SideBarTypeState',
    default: 'portfolio',
});

export const isPortfolioState = atom<boolean>({
    key: 'isPortfolioState',
    default: true,
});

// 방 참가 인원 닉네임 보기
export const RoomJoinUsersNicknameState = atom<string[]>({
    key: 'RoomJoinUsersNicknameState',
    default: ['wait..', 'wait..', 'wait..', 'wait..'],
    // effects_UNSTABLE: [persistAtom],
});

// 방 참가 인원 아이디 보기
export const RoomJoinUsersIdState = atom<number[]>({
    key: 'RoomJoinUsersIdState',
    default: [0, 0, 0, 0],
    effects_UNSTABLE: [persistAtom],
});

// 게임 캐릭터

export const RoomJoinUsersCharacterState = atom({
    key: 'RoomJoinUsersCharacterState',
    default: null,
});

export const NicknameToRollSelector = selector({
    key: 'NicknameToRollSelector',
    get: ({ get }) => {
        const UsersId = get(RoomJoinUsersIdState);
        const UsersNickname = get(RoomJoinUsersNicknameState);
        const playerToRoll = get(PlayerToRollState);
        return UsersNickname[UsersId.indexOf(playerToRoll)];
    },
});
