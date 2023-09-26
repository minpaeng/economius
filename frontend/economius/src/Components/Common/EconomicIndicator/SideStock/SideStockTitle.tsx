import * as S from "./SideStock.style";

function SideStockTitle({ name, imgpath }) {
  console.log(imgpath);
  return (
    <S.SideStockTitle>
      <div style={{ flex: 3 }}>
        <div
          style={{
            border: "3px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "black",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
          }}
        >
          <img src={`Stock/${imgpath}.png`} alt="img" />
        </div>
      </div>
      <div style={{ flex: 4 }}>
        <div style={{ textAlign: "center" }}>{name}</div>
      </div>
      <div style={{ flex: 3 }}></div>
    </S.SideStockTitle>
  );
}

export default SideStockTitle;
