function PlayerChracter({ character }) {
  return (
    <div style={{ flex: 3 }}>
      <img
        src={`2D_Chracter/${character}/${character} Pose - 05.png`}
        alt="img"
        style={{ width: "115px" }}
      />
    </div>
  );
}

export default PlayerChracter;
