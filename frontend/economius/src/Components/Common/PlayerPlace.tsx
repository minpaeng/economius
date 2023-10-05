import Modal from 'react-modal';

import PlayerChracter from './PlayerChracter';
import PlayerProperty from './PlayerProperty';
import PlayerRanking from './PlayerRanking';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PortfolioState, ClickUserPortfolioState } from '../../recoil/game/atom';
import { isPortfolioState, SideBarTypeState } from '../../recoil/animation/atom';
import { effectAudioPopup, effectAudioClick } from '/src/Audio';

const PlayerLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

function PlayerPlace({ borderRadius, top, left, bgColor, idx, character, borderWidth, Ranking, Nick, userId }) {
    const [clickUserId, setClickUserId] = useRecoilState(ClickUserPortfolioState);

    const [isPortfolio, setIsPortfolio] = useRecoilState(isPortfolioState);

    const [sideBarType, setSideBarType] = useRecoilState(SideBarTypeState);

    const portfolios = useRecoilValue(PortfolioState);
    const money = portfolios[userId].money;
    const totalMoney = portfolios[userId].totalMoney;
    // modal style
    const modalStyle: any = {
        overlay: {
            position: 'fixed',
            //  변동해야하는 값 top="6%", left="0"
            top: top,
            left: left,

            width: '25%',
            height: '19%',
            backgroundColor: 'rgba(0,0,0,0)',
            zIndex: '1',
        },
        content: {
            display: 'flex',
            flexDirextion: 'column',
            color: bgColor,
            backgroundColor: 'rgba(12,14,20,0.8)',
            overflow: 'auto',
            zIndex: '1',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // border: 'none',
            border: `1px solid ${bgColor}`,
            // borderLeft: `4px solid ${bgColor} rgba(12,14,20,0.8)`,
            borderWidth: borderWidth,
            width: '100%',
            height: '100%',
            padding: '0px',
            borderRadius: borderRadius,
        },
    };
    return (
        <Modal isOpen={true} style={modalStyle}>
            {!(idx % 2) ? (
                // TODO: 이것도 일단 idx로 해둠 ==> 나중에 각각의 userID를 받아서 바꿔줄 것
                <PlayerLayout
                    onClick={() => {
                        setClickUserId(userId);
                        setSideBarType('portfolio');
                        setIsPortfolio(true);
                        effectAudioClick.play();
                    }}
                >
                    <PlayerRanking Ranking={Ranking} />
                    <PlayerProperty AllProperty={totalMoney} money={money} Nick={Nick} userId={userId} />
                    <PlayerChracter character={character} />
                </PlayerLayout>
            ) : (
                <PlayerLayout
                    onClick={() => {
                        setClickUserId(userId);
                        setSideBarType('portfolio');
                        setIsPortfolio(true);
                        effectAudioClick.play();
                    }}
                >
                    <PlayerChracter character={character} />
                    <PlayerProperty AllProperty={totalMoney} money={money} Nick={Nick} userId={userId} />
                    <PlayerRanking Ranking={Ranking} />
                </PlayerLayout>
            )}
        </Modal>
    );
}

export default PlayerPlace;
