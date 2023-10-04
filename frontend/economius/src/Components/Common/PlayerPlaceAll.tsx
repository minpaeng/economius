import PlayerPlace from './PlayerPlace';
import { RoomJoinUsersIdState, RoomJoinUsersNicknameState } from '../../recoil/animation/atom';
import { RoomJoinUsersCharacterState } from '/src/recoil/animation/atom';
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
    // console.log(CharacterArr);

    const AllProperty1 = 3400000;
    const AllProperty2 = 5000000;
    const AllProperty3 = 1890000;
    const AllProperty4 = 1988000;

    const money1 = 2000000;
    const money2 = 1680000;
    const money3 = 1220000;
    const money4 = 380000;

    const Ranking1 = 2;
    const Ranking2 = 1;
    const Ranking3 = 4;
    const Ranking4 = 3;

    return (
        <>
            <PlayerPlace
                idx={1}
                borderRadius='0px 0px 100px 0px'
                top='6%'
                left='0%'
                bgColor='rgba(255, 216, 133, 0.9)'
                character={CharacterArr[0]}
                AllProperty={AllProperty1}
                money={money1}
                Ranking={Ranking1}
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
                AllProperty={AllProperty2}
                money={money2}
                Ranking={Ranking2}
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
                AllProperty={AllProperty3}
                money={money3}
                Ranking={Ranking3}
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
                AllProperty={AllProperty4}
                money={money4}
                Ranking={Ranking4}
                Nick={NickNameArr[3]}
                userId={UserIdArr[3]}
            />
        </>
    );
}

export default PlayerPlaceAll;
