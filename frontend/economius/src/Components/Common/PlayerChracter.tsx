function PlayerChracter({ character }) {
    return (
        <div style={{ flex: 3 }}>
            <img src={`roomImg/${character}.png`} alt='img' style={{ width: '115px' }} />
        </div>
    );
}

export default PlayerChracter;
