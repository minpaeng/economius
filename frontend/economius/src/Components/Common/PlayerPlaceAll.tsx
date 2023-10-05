import PlayerPlace from './PlayerPlace';
import { RoomJoinUsersIdState, RoomJoinUsersNicknameState } from '../../recoil/animation/atom';
import { RoomJoinUsersCharacterState } from '/src/recoil/animation/atom';
import { PlayerRankingState } from '/src/recoil/game/atom.tsx';
import { useRecoilValue } from 'recoil';

function PlayerPlaceAll() {
    const NickNameArr = useRecoilValue(RoomJoinUsersNicknameState);
    const UserIdArr = useRecoilValue(RoomJoinUsersIdState);
    const Characters = useRecoilValue(RoomJoinUsersCharacterState);

    function objectToArray(obj) {
        if (obj === null) {
            return;
        }
        if (!obj) {
            return [];
        }
        return Object.values(obj);
    }

    const CharacterArr = objectToArray(Characters);

    const borderWidth = ['0px 5px 5px 0px', '0px 0px 5px 5px', '5px 5px 0px 0px', '5px 0px 0px 5px'];

    const PlayerRanking = useRecoilValue(PlayerRankingState);

    console.log(PlayerRanking);

    function rankingCheck(PlayerRanking) {
        const returnRank = [];
        for (let i = 0; i < PlayerRanking?.length; i++) {
            returnRank.push(PlayerRanking?.indexOf(UserIdArr[i]) + 1);
        }
        console.log(returnRank);
        return returnRank;
    }

    const Rank = rankingCheck(PlayerRanking);
    console.log(Rank);

    return (
        <>
            <PlayerPlace
                idx={1}
                borderRadius='0px 0px 100px 0px'
                top='6%'
                left='0%'
                bgColor='rgba(255, 216, 133, 0.9)'
                character={CharacterArr[0]}
                borderWidth={borderWidth[0]}
                Ranking={Rank[0]}
                Nick={NickNameArr[0]}
                userId={UserIdArr[0]}
            />
            <PlayerPlace
                idx={2}
                borderRadius='0px 0px 0px 100px'
                top='6%'
                left='50%'
                bgColor='rgba(131, 213, 233, 0.9)'
                character={CharacterArr[1]}
                Ranking={Rank[1]}
                borderWidth={borderWidth[1]}
                Nick={NickNameArr[1]}
                userId={UserIdArr[1]}
            />
            <PlayerPlace
                idx={3}
                borderRadius='0px 100px 0px 0px'
                top='81%'
                left='0%'
                bgColor='rgba(255, 166, 132, 0.90)'
                character={CharacterArr[2]}
                Ranking={Rank[2]}
                borderWidth={borderWidth[2]}
                Nick={NickNameArr[2]}
                userId={UserIdArr[2]}
            />

            <PlayerPlace
                idx={4}
                borderRadius='100px 0px 0px 0px'
                top='81%'
                left='50%'
                bgColor='rgba(255, 156, 159, 0.90)'
                character={CharacterArr[3]}
                Ranking={Rank[3]}
                borderWidth={borderWidth[3]}
                Nick={NickNameArr[3]}
                userId={UserIdArr[3]}
            />
        </>
    );
}

export default PlayerPlaceAll;
