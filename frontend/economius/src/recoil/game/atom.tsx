import { atom } from "recoil";

export const PlayerIdState = atom({
  key: "PlayerIdState",
  default: 1,
});

export const PortfolioState = atom({
  key: "PortfolioState",
  default: null,
});

export const StockState = atom({
  key: "StockState",
  default: null,
});

export const PredictionState = atom({
  key: "PredictionState",
  default: null,
});

// 클릭한 유저 포트폴리오 보여주는 용

export const ClickUserPortfolioState = atom({
  key: "ClickUserPortfolioState",
  // TODO: 일단 디폴트 1로 해놨는데 로컬스토리지에서 본인 id 가져와서 넣어줘야 함
  default: 1,
});

export const GoldState = atom({
  key: "GoldState",
  default: null,
});

export const interestRateState = atom({
  key: "interestRateState",
  default: null,
});

export const buildingState = atom({
  key: "buildingState",
  default: null,
});
