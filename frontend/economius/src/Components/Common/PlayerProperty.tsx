import styled from 'styled-components';
import { PlayerToRollState } from '/src/recoil/game/atom';
import { RoomJoinUsersIdState } from '/src/recoil/animation/atom';
import { useRecoilValue } from 'recoil';

const PlayerTurn_1 = styled.div`
    flex: 5;
    font-size: 30px;
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px rgba(255, 216, 133, 0.9), 0 0 82px rgba(255, 216, 133, 0.9),
        0 0 92px rgba(255, 216, 133, 0.9), 0 0 102px rgba(255, 216, 133, 0.9), 0 0 151px rgba(255, 216, 133, 0.9);
`;
const PlayerTurn_2 = styled.div`
    flex: 5;
    font-size: 30px;
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px rgba(131, 213, 233, 0.9), 0 0 82px rgba(131, 213, 233, 0.9),
        0 0 92px rgba(131, 213, 233, 0.9), 0 0 102px rgba(131, 213, 233, 0.9), 0 0 151px rgba(131, 213, 233, 0.9);
`;
const PlayerTurn_3 = styled.div`
    flex: 5;
    font-size: 30px;
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px rgba(255, 166, 132, 0.9), 0 0 82px rgba(255, 166, 132, 0.9),
        0 0 92px rgba(255, 166, 132, 0.9), 0 0 102px rgba(255, 166, 132, 0.9), 0 0 151px rgba(255, 166, 132, 0.9);
`;
const PlayerTurn_4 = styled.div`
    flex: 5;
    font-size: 30px;
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px rgba(255, 156, 159, 0.9), 0 0 82px rgba(255, 156, 159, 0.9),
        0 0 92px rgba(255, 156, 159, 0.9), 0 0 102px rgba(255, 156, 159, 0.9), 0 0 151px rgba(255, 156, 159, 0.9);
`;

function PlayerProperty({ AllProperty, money, Nick, userId }) {
    const PlayerIdArr = useRecoilValue(RoomJoinUsersIdState);
    const PlayerToRoll = useRecoilValue(PlayerToRollState);

    let userNickstyle;

    if (PlayerToRoll === userId) {
        const userPos = PlayerIdArr.indexOf(userId) + 1;
        if (userPos === 1) {
            userNickstyle = <PlayerTurn_1 style={{ flex: 5, fontSize: '30px' }}>{Nick}</PlayerTurn_1>;
        } else if (userPos === 2) {
            userNickstyle = <PlayerTurn_2 style={{ flex: 5, fontSize: '30px' }}>{Nick}</PlayerTurn_2>;
        } else if (userPos === 3) {
            userNickstyle = <PlayerTurn_3 style={{ flex: 5, fontSize: '30px' }}>{Nick}</PlayerTurn_3>;
        } else {
            userNickstyle = <PlayerTurn_4 style={{ flex: 5, fontSize: '30px' }}>{Nick}</PlayerTurn_4>;
        }
    } else {
        userNickstyle = <div style={{ flex: 5, fontSize: '30px' }}>{Nick}</div>;
    }

    return (
        <div
            style={{
                flex: 4,
                display: 'flex',
                flexDirection: 'column',
                height: '60%',
            }}
        >
            {/* <div style={{ flex: 5, fontSize: '30px' }}>{Nick}</div> */}
            {userNickstyle}
            <div style={{ flex: 2.5 }}>현금 : {money.toLocaleString()}</div>
            <div style={{ flex: 2.5 }}>총 자산 : {AllProperty.toLocaleString()}</div>
        </div>
    );
}

export default PlayerProperty;
