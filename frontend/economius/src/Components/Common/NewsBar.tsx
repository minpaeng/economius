import Modal from "react-modal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function NewsBar() {
  const data = [
    "[속보] 부동산 버블이 증가하고 있어요",
    "[경제 News] 금리 0.5% 인상",
    "[속보] 타입스크립트 극혐",
  ];
  // modal style
  const modalStyle: any = {
    overlay: {
      position: "fixed",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "94%",
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: "1",
      //   width: "100px",
      //   height: "6%",
    },
    content: {
      display: "flex",
      flexDirextion: "column",
      alignItems: "center",

      backgroundColor: "#b8d4ffdb",
      overflow: "auto",
      zIndex: "1",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      border: "none",
      //   border: "5px solid white",
      borderRadius: "0px",
      padding: "0px",
    },
  };
  return (
    <Modal isOpen={true} style={modalStyle}>
      <img src="NewsBar/megaphone.png" alt="img" style={{ width: "50px" }} />
      <div style={{ fontSize: "25px" }}>
        <Carousel
          autoPlay={true}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          centerMode={false}
          infiniteLoop={true}
          stopOnHover={false}
          axis="vertical"
        >
          {data.map((word, index) => (
            <span key={index} style={{ textAlign: "left" }}>
              <b>{word}</b>
            </span>
          ))}
        </Carousel>
      </div>
    </Modal>
  );
}

export default NewsBar;
