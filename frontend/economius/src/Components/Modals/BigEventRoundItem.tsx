function BigEventRoundItem({ title, changeRate }) {
    let ChangeRateSpan;

    if (changeRate > 0) {
        ChangeRateSpan = <span style={{ color: 'rgb(82,165,155)' }}>{`( +${changeRate}% ▲)`}</span>;
    } else if (changeRate < 0) {
        ChangeRateSpan = <span style={{ color: 'rgb(221,94,86)' }}>{`( ${changeRate}% ▼)`}</span>;
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
