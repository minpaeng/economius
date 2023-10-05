import { useRecoilValue } from 'recoil';
import { NicknameToRollSelector } from '/src/recoil/animation/atom';

const Style: any = {
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    top: '65%',
    marginLeft: '25%',
    marginRight: 'auto',
};

const left: any = {
    display: 'flex',
    width: '40px',
    height: '50px',
    background: 'linear-gradient(to left, rgba(0, 0, 0, 0.5), transparent)',
};

const centerside: any = {
    display: 'flex',
    width: '30px',
    height: '50px',
    background: 'rgba(0, 0, 0, 0.5)',
};

const center: any = {
    display: 'flex',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
    color: '#d9d9d9',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const right: any = {
    display: 'flex',
    width: '40px',
    height: '50px',
    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.5), transparent)',
};

function OtherPerson() {
    const nicknameToRoll = useRecoilValue(NicknameToRollSelector);
    return (
        <div style={Style}>
            <div style={left}></div>
            <div style={centerside}></div>
            <div style={center}>{nicknameToRoll} 님이 플레이를 하고 있습니다.</div>
            <div style={centerside}></div>
            <div style={right}> </div>
        </div>
    );
}

export default OtherPerson;
