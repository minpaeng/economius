import PlayerPlace from './PlayerPlace';

function PlayerPlaceAll() {
    const character1 = 'Butterfly';
    const character2 = 'Deer';
    const character3 = 'Bird';
    const character4 = 'Camel';

    const Nick1 = '지니어스';
    const Nick2 = '이코노미';
    const Nick3 = '비즈니스';
    const Nick4 = '퍼스트';

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
                character={character1}
                AllProperty={AllProperty1}
                money={money1}
                Ranking={Ranking1}
                Nick={Nick1}
            />
            <PlayerPlace
                idx={2}
                borderRadius='0px 0px 0px 100px'
                top='6%'
                left='50%'
                bgColor='rgba(131, 213, 233, 0.9)'
                character={character2}
                AllProperty={AllProperty2}
                money={money2}
                Ranking={Ranking2}
                Nick={Nick2}
            />
            <PlayerPlace
                idx={3}
                borderRadius='0px 100px 0px 0px'
                top='81%'
                left='0%'
                bgColor='rgba(255, 166, 132, 0.90)'
                character={character3}
                AllProperty={AllProperty3}
                money={money3}
                Ranking={Ranking3}
                Nick={Nick3}
            />

            <PlayerPlace
                idx={4}
                borderRadius='100px 0px 0px 0px'
                top='81%'
                left='50%'
                bgColor='rgba(255, 156, 159, 0.90)'
                character={character4}
                AllProperty={AllProperty4}
                money={money4}
                Ranking={Ranking4}
                Nick={Nick4}
            />
        </>
    );
}

export default PlayerPlaceAll;
