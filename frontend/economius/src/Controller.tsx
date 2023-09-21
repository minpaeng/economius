import { useRecoilState } from "recoil";
import {
  nowPlayerState,
  IsMovingState,
  MoveDistState,
} from "/src/recoil/animation/atom";

function Controller() {
  const [nowPlayer, setNowPlayer] = useRecoilState(nowPlayerState); // 현재 플레이어
  const [isMoving, setIsMoving] = useRecoilState(IsMovingState); // 캐릭터 이동 여부
  const [moveDist, setMoveDist] = useRecoilState(MoveDistState); // 캐릭터 이동 거리
  const distButtons = [1, 2, 3, 4, 5, 6];
  const playerButtons = ["Player1", "Player2", "Player3", "Player4"];

  return (
    <>
      {/* 이동 여부, 이동 거리 갱신 */}
      {distButtons.map((value) => (
        <div
          key={value}
          style={{
            position: "absolute",
            top: "50vh",
            left: `${20 + value * 5}vw`,
          }}
        >
          <button
            style={{ backgroundColor: isMoving ? "orange" : "white" }}
            onClick={() => (setIsMoving(true), setMoveDist(value))}
          >
            {value}
          </button>
        </div>
      ))}

      {/* // 현재 플레이어 갱신 */}
      {playerButtons.map((nickname, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "55vh",
            left: `${28 + index * 5}vw`,
          }}
        >
          <button
            style={{
              backgroundColor: index === nowPlayer ? "orange" : "white",
            }}
            onClick={() => setNowPlayer(index)}
          >
            {nickname}
          </button>
        </div>
      ))}
    </>
  );
}

export default Controller;
