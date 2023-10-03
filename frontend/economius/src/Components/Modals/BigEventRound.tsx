import Modal from "react-modal";
import * as S from "./BigEvent.style";

// import { useRecoilState, useSetRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { BigEventInfoState } from "../../recoil/modalInfo/atom";
// import { CallBackState, IsModalOpenState } from "/src/recoil/animation/atom";

import { useEffect, useState } from "react";
// import { BigEventInfoState } from "../../recoil/modalInfo/atom";
import BigEventRoundItem from "./BigEventRoundItem";

function BigEventRound() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const issue = useRecoilValue(BigEventInfoState);

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (issue === null) {
      return;
    }

    setIsModalOpen(true);

    console.log(issue);
  }, [issue]);

  // modal style
  const modalStyle: any = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: 10,
    },
    content: {
      display: "flex",
      flexDirextion: "column",
      //   backgroundColor: "rgba(255,255,255,0.95)",
      overflow: "auto",
      zIndex: 10,
      top: "80px",
      left: "50px",
      right: "400px",
      bottom: "80px",
      border: `10px solid white`,
      borderRadius: "100px",
      backgroundImage: `url("${issue?.url}")`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  };

  function Rate_Gold_EstateList(
    InterestRateChange,
    GoldChange,
    BuildingChange
  ) {
    const DataArr = [];
    if (issue) {
      DataArr.push({
        title: InterestRateChange.assetType,
        changeRate: InterestRateChange.changePercentage,
      });
      DataArr.push({
        title: GoldChange.assetType,
        changeRate: GoldChange.changePercentage,
      });
      DataArr.push({
        title: BuildingChange.assetType,
        changeRate: BuildingChange.changePercentage,
      });
    }
    return DataArr;
  }

  const Rate_Gold_Estate = Rate_Gold_EstateList(
    issue?.interestRateChange,
    issue?.goldChange,
    issue?.buildingChange
  );

  console.log(Rate_Gold_Estate);

  function StockDataChange(stockChanges) {
    const UpStock = [];
    const StableStock = [];
    const DownStock = [];

    if (issue) {
      for (let i = 0; i < stockChanges.length; i++) {
        if (stockChanges[i].changePercentage > 0) {
          UpStock.push({
            title: stockChanges[i].stockType,
            changeRate: stockChanges[i].changePercentage,
          });
        } else if (stockChanges[i].changePercentage < 0) {
          DownStock.push({
            title: stockChanges[i].stockType,
            changeRate: stockChanges[i].changePercentage,
          });
        } else {
          StableStock.push({
            title: stockChanges[i].stockType,
            changeRate: stockChanges[i].changePercentage,
          });
        }
      }
    }

    return [UpStock, StableStock, DownStock];
  }

  const [Up, Stable, Down] = StockDataChange(issue?.stockChanges);
  console.log(Up, Stable, Down);

  return (
    <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
      <S.BigEvent>
        <S.BigEventLeft />
        <S.BigEventRight
          style={{ color: issue?.type === "BOOM" ? "black" : "white" }}
        >
          <S.BigEventRightTitle>{issue?.name}</S.BigEventRightTitle>
          <S.BigEventRightChange1>{`${issue?.year} / ${issue?.country}`}</S.BigEventRightChange1>
          <S.BigEventRightDesc>{issue?.description}</S.BigEventRightDesc>
          <div>
            <div style={{ fontSize: "28px" }}>주요 지표</div>
            <br />
            <S.BigEventRightRate_Gold_Estate>
              {Rate_Gold_Estate.map((item, idx) => {
                return (
                  <BigEventRoundItem
                    title={item.title}
                    changeRate={item.changeRate}
                    key={idx}
                  />
                );
              })}
            </S.BigEventRightRate_Gold_Estate>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "28px" }}>상승({Up?.length})</div>
            <br />
            <S.BigEventRightUp>
              {Up.map((item, idx) => {
                return (
                  <BigEventRoundItem
                    title={item.title}
                    changeRate={item.changeRate}
                    key={idx}
                  />
                );
              })}
            </S.BigEventRightUp>
            <br />
            <div style={{ fontSize: "28px" }}>안정({Stable?.length})</div>
            <br />
            <S.BigEventRightStable>
              {Stable.map((item, idx) => {
                return (
                  <BigEventRoundItem
                    title={item.title}
                    changeRate={item.changeRate}
                    key={idx}
                  />
                );
              })}
            </S.BigEventRightStable>
            <br />
            <div style={{ fontSize: "28px" }}>하락({Down?.length})</div>
            <br />
            <S.BigEventRightDown>
              {Down.map((item, idx) => {
                return (
                  <BigEventRoundItem
                    title={item.title}
                    changeRate={item.changeRate}
                    key={idx}
                  />
                );
              })}
            </S.BigEventRightDown>
          </div>
        </S.BigEventRight>
      </S.BigEvent>
    </Modal>
  );
}

export default BigEventRound;
