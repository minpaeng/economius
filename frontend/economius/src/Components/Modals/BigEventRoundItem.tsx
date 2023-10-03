function BigEventRoundItem({ title, changeRate }) {
  let ChangeRateSpan;

  if (changeRate > 0) {
    ChangeRateSpan = (
      <span style={{ color: "red" }}>{`( +${changeRate}% ▲)`}</span>
    );
  } else if (changeRate < 0) {
    ChangeRateSpan = (
      <span style={{ color: "blue" }}>{`( ${changeRate}% ▼)`}</span>
    );
  } else {
    ChangeRateSpan = <span>(-)</span>;
  }

  return (
    <div>
      <span>{title}</span>
      {ChangeRateSpan}
    </div>
  );
}
export default BigEventRoundItem;
