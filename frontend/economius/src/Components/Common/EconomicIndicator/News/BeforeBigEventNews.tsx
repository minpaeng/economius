// import * as S from "../../PortfolioProperty/PortfolioProperty.style";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// function BeforeBigEventNews({ News }) {
//   const [selectedId, setSelectedId] = useState();
//   return (
//     <S.ToggleLayout style={{ padding: "4px 12px 12px 12px" }}>
//       {News.map((news, idx) => {
//         return (
//           <motion.div
//             layoutId={idx}
//             onClick={() => setSelectedId(idx)}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               borderRadius: "12px",
//               boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
//               border: "1px solid rgba(131, 129, 129, 0.2)",
//               background: "rgba(255, 255, 255, 0.5)",
//               padding: "8px 12px 5px 12px",
//               marginTop: "8px",
//               width: "91.5%",
//             }}
//           >
//             <div>{news}</div>
//           </motion.div>
//         );
//       })}

//     </S.ToggleLayout>
//   );
// }

// export default BeforeBigEventNews;

import * as S from "../../PortfolioProperty/PortfolioProperty.style";

import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { NewsClickIdxState } from "/src/recoil/animation/atom";

function BeforeBigEventNews({ News }) {
  //   const [selectedId, setSelectedId] = useState(null); // 초기에는 선택한 아이템이 없으므로 null로 설정
  const [NewsClickIdx, setNewsClickIdx] = useRecoilState(NewsClickIdxState);

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
            }}
          >
            <div>{news}</div>
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
            }}
          >
            <motion.div>
              {
                News[
                  NewsClickIdx !== null ? NewsClickIdx.toString() : undefined
                ]
              }
            </motion.div>
            <motion.button onClick={() => setNewsClickIdx(null)}>
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </S.ToggleLayout>
  );
}

export default BeforeBigEventNews;
