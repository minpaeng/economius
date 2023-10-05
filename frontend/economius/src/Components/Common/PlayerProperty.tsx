function PlayerProperty({ AllProperty, money, Nick }) {
    return (
        <div
            style={{
                flex: 4,
                display: 'flex',
                flexDirection: 'column',
                height: '60%',
            }}
        >
            <div style={{ flex: 5, fontSize: '30px' }}>{Nick}</div>
            <div style={{ flex: 2.5 }}>현금 : {money.toLocaleString()}</div>
            <div style={{ flex: 2.5 }}>총 자산 : {AllProperty.toLocaleString()}</div>
        </div>
    );
}

export default PlayerProperty;
