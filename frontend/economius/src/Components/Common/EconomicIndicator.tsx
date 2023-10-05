import { useEffect, useState } from "react";
import * as S from "./EconomicIndicator.style";
import ChartSection from "./EconomicIndicator/IndicatorSection/ChartSection";
import StockChange from "./EconomicIndicator/IndicatorSection/StockChange";
import BeforeBigEventNews from "./EconomicIndicator/News/BeforeBigEventNews";
import AfterBigEventNews from "./EconomicIndicator/News/AfterBigEventNews";
import { useRecoilValue } from "recoil";
import {
  GoldState,
  interestRateState,
  buildingState,
  currentPrevIssueState,
  currentIssueState,
} from "../../recoil/game/atom";

function EconomicIndicator({ setSideBarType }) {
  const [beforeBigEvent, setBeforeBigEvent] = useState(false);

  const currentPrevIssue = useRecoilValue(currentPrevIssueState);

  function beforeBigEventNews(currentPrevIssue) {
    if (currentPrevIssue === null) {
      return [];
    }
    const beforeBigEventNewsList = [];
    for (let i = 0; i < currentPrevIssue.length; i++) {
      beforeBigEventNewsList.push(currentPrevIssue[i].foretoken);
    }

    return beforeBigEventNewsList;
  }

  const currentIssue = useRecoilValue(currentIssueState);

  useEffect(() => {
    if (currentPrevIssue === null) {
      return;
    }
    setBeforeBigEvent(true);
  }, [currentPrevIssue]);

  useEffect(() => {
    if (currentIssue === null) {
      return;
    }
    setBeforeBigEvent(false);
  }, [currentIssue]);

  const NewsList = [];

  if (currentIssue) {
    console.log(currentIssue);
    for (let i = 0; i < currentIssue.currentAssetChanges.length; i++) {
      if (i < 4) {
        NewsList.push(currentIssue.currentAssetChanges[i].changeReason);
      } else {
        NewsList[3] += `${currentIssue.currentAssetChanges[i].changeReason}\n`;
      }
    }
  }

  const interestRateData = useRecoilValue(interestRateState);
  const interestRate = "interestRate";
  const interestRateTitle = "금리";

  const goldData = useRecoilValue(GoldState);
  const goldImgPath = "goldbar";
  const goldTitle = "금";

  const realEstateData = useRecoilValue(buildingState);
  const reaEstateImgPath = "RealEstate";
  const realEstateTitle = "부동산";

  function makebuildingData(obj) {
    const returnArr = [];
    for (let i = 1; i < 4; i++) {
      returnArr.push(obj[i].priceHistory);
    }
    return returnArr;
  }

  return (
    <S.EconomicIndicatorMain>
      {/* 경제 뉴스 */}
      {/* <div style={{ fontSize: "18px", marginTop: "8px" }}>경제 뉴스</div> */}
      <div
        style={{
          fontSize: "20px",
          marginTop: "8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="EconomicIndicator/EconomicNews.png"
          alt="img"
          style={{ height: "30px", marginRight: "5px" }}
        />
        <span>경제 뉴스</span>
      </div>
      {beforeBigEvent ? (
        <BeforeBigEventNews News={beforeBigEventNews(currentPrevIssue)} />
      ) : (
        <AfterBigEventNews News={NewsList} />
      )}

      <div
        style={{
          fontSize: "20px",
          marginTop: "8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="EconomicIndicator/Indicator.png"
          alt="img"
          style={{ height: "30px", marginRight: "5px" }}
        />
        <span>경제 지표</span>
      </div>
      {/* 금리 차트 */}
      <ChartSection
        title={interestRateTitle}
        imgPath={interestRate}
        data={interestRateData}
      />
      {/* 금 차트 */}

      <ChartSection title={goldTitle} imgPath={goldImgPath} data={goldData} />

      {/* 부동산 차트 */}

      <ChartSection
        title={realEstateTitle}
        imgPath={reaEstateImgPath}
        data={makebuildingData(realEstateData)}
      />

      {/* 주식 리스트 */}
      <StockChange setSideBarType={setSideBarType} />
    </S.EconomicIndicatorMain>
  );
}

export default EconomicIndicator;
