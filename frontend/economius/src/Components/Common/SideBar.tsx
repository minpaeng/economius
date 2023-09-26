import Modal from "react-modal";
import * as S from "./SideBar.style";
import { useState } from "react";
import Portfolio from "./Portfolio";
import EconomicIndicator from "./EconomicIndicator";
import StockCheck from "./StockCheck";
import { useRecoilState } from "recoil";
import {
  StockClickIdState,
  SideBarTypeState,
  isPortfolioState,
} from "/src/recoil/animation/atom";
// import { motion, AnimatePresence } from "framer-motion";

function SideBar() {
  // 뉴스

  // const News = ["속보1", "속보2", "속보3", "속보4", "속보5"];

  const [sideBarType, setSideBarType] = useRecoilState(SideBarTypeState);

  const [stockId, setStockId] = useRecoilState(StockClickIdState);

  const [isPortfolio, setIsPortfolio] = useRecoilState(isPortfolioState);

  // const [NewsClickIdx, setNewsClickIdx] = useRecoilState(NewsClickIdxState);

  // 렌더링할 컴포넌트 정의
  let componentToRender;

  if (sideBarType === "portfolio") {
    componentToRender = <Portfolio setSideBarType={setSideBarType} />;
  } else if (sideBarType === "economicIndicator") {
    componentToRender = <EconomicIndicator setSideBarType={setSideBarType} />;
  } else if (sideBarType === "StockCheck") {
    componentToRender = (
      <StockCheck
        clickStockId={stockId}
        isPortfolio={isPortfolio}
        setIsPortfolio={setIsPortfolio}
      />
    );
  }

  // modal style
  const modalStyle: any = {
    overlay: {
      position: "fixed",
      top: "6%",
      left: "75%",
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0)",
      zIndex: 1,
      //   width: "0px",
    },
    content: {
      display: "flex",
      flexDirextion: "column",
      backgroundColor: "#b8d4ffdb",
      overflow: "auto",
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: "none",
      //   width: "100%",
      //   height: "100%",
      //   border: "5px solid white",
      borderRadius: "0",

      padding: "0px",
    },
  };
  return (
    <Modal isOpen={true} style={modalStyle}>
      <S.SideBar>
        <S.SideBarBtnSection>
          <S.PushableButton
            onClick={() => {
              setSideBarType("portfolio");
              setIsPortfolio(true);
            }}
          >
            <span className="front">포트폴리오</span>
          </S.PushableButton>
          <S.PushableButton
            onClick={() => {
              setSideBarType("economicIndicator");
              setIsPortfolio(false);
            }}
          >
            <span className="front">경제 지표</span>
          </S.PushableButton>
        </S.SideBarBtnSection>

        <S.SideBarMainSection
          style={{
            backgroundColor:
              sideBarType === "StockCheck"
                ? "white"
                : "rgba(255, 255, 255, 0.5)",
          }}
        >
          {componentToRender}
        </S.SideBarMainSection>
      </S.SideBar>
    </Modal>
  );
}

export default SideBar;
