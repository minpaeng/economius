import * as S from "../../PortfolioProperty/PortfolioProperty.style";
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { NewsClickIdxState } from "/src/recoil/animation/atom";

function AfterBigEventNews({ News }) {
  console.log(News);
  const [NewsClickIdx, setNewsClickIdx] = useRecoilState(NewsClickIdxState);

  function shortenText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
  }

  return (
    <S.ToggleLayout
      style={{ padding: "4px 12px 12px 12px", position: "relative" }}
    >
      {News.map((news, idx) => {
        return (
          <motion.div
            key={idx} // 각 뉴스 아이템에 고유한 키를 설정해야 합니다.
            layoutId={idx}
            onClick={() => setNewsClickIdx(idx)}
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "12px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(131, 129, 129, 0.2)",
              background: "rgba(255, 255, 255, 0.5)",
              padding: "8px 12px 5px 12px",
              marginTop: "8px",
              width: "91.5%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              cursor: "pointer",
            }}
          >
            <div>{shortenText(news, 25)}</div>
          </motion.div>
        );
      })}
      {/* 선택한 아이템이 있을 때만 AnimatePresence를 사용하여 표시 */}
      <AnimatePresence>
        {NewsClickIdx !== null && (
          <motion.div
            key="selectedNews" // 고유한 키를 설정해야 합니다.
            layoutId={NewsClickIdx !== null ? NewsClickIdx.toString() : ""}
            style={{
              position: "absolute",
              backgroundColor: "yellow",
              width: "86%",
              height: "86%",
              padding: "8px 12px",
              borderRadius: "12px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(131, 129, 129, 0.2)",
              background: "rgba(255, 255, 255, 1)",
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <motion.div>
              {
                News[
                  NewsClickIdx !== null ? NewsClickIdx.toString() : undefined
                ]
              }
            </motion.div>
            <motion.div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.button
                onClick={() => setNewsClickIdx(null)}
                style={{
                  fontSize: "15px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 1)",
                  cursor: "pointer",
                }}
              >
                닫기
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </S.ToggleLayout>
  );
}

export default AfterBigEventNews;
