import React, { useState, useEffect, useRef } from 'react';
// import SockJS from 'sockjs-client';
import sockjs from 'sockjs-client/dist/sockjs';
import { Stomp } from '@stomp/stompjs';
import { useRecoilState } from 'recoil';
import { IsModalOpenState, NowPlayerState, NowPlayerPositionState } from './recoil/animation/atom';
import { TradeRealEstateState } from './recoil/trading/atom';

const buildingIds = {
    4: 1,
    14: 2,
    22: 3,
};

function PlayerSocket() {
    const [isOpen, setIsOpen] = useRecoilState(IsModalOpenState);
    const [nowPlayer, setNowPlayerState] = useRecoilState(NowPlayerState);
    const [nowPlayerPosition, setNowPlayerPosition] = useRecoilState(NowPlayerPositionState);
    const [tradeRealEstate, setTradeRealEstate] = useRecoilState(TradeRealEstateState);

    const stompClient = useRef(null);

    useEffect(() => {
        // 소켓 연결
        stompClient.current = Stomp.over(() => new sockjs('http://j9b109.p.ssafy.io:8080/ws'));
    }, []);

    const connectHandler = () => {
        // stompClient가 null인 경우 연결하지 않음
        if (!stompClient.current) {
            return;
        }

        stompClient.current.connect(
            {
                // Authorization: "access token"
            },
            function () {
                // 방 입장
                // pub/{roomId}/enter
                stompClient.current.send('/pub/1/enter', {}, JSON.stringify({ data: 'Hello!' }));

                // 개인 메시지 구독
                // sub/{roomId}/{playerId}
                stompClient.current.subscribe(`/sub/1/1`, function (message) {
                    console.log('메세지: ' + message.body);
                });

                // 방 메시지 구독
                // sub/{roomId}/
                stompClient.current.subscribe(`/sub/1`, function (message) {
                    console.log('메세지: ' + message.body);
                });
            }
        );
    };

    useEffect(() => {
        connectHandler();
    }, []);

    useEffect(() => {
        console.log('nowPlayerPosition', nowPlayerPosition);
        console.log('nowPlayer', nowPlayer);
        if (isOpen && [4, 14, 22].includes(nowPlayerPosition)) {
            // isOpen 상태가 true일 때 메시지를 보내는 코드를 추가
            if (stompClient.current) {
                stompClient.current.send('/pub/1/visitBuilding', {}, JSON.stringify({ player: nowPlayer + 1, buildingId: buildingIds[nowPlayerPosition] }));
                // 0번째 player를 서버에 1로 보내줘야 해서
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (tradeRealEstate[0]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/buyBuildings', {}, JSON.stringify({ player: nowPlayer + 1, buildingId: buildingIds[nowPlayerPosition] }));
                stompClient.current.send(
                    '/pub/1/selectBuilding',
                    {},
                    JSON.stringify({ player: nowPlayer + 1, visit: false, buildingId: buildingIds[nowPlayerPosition] })
                );
                setTradeRealEstate([false, false]);
            }
        } else if (tradeRealEstate[1]) {
            if (stompClient.current) {
                stompClient.current.send('/pub/1/sellBuildings', {}, JSON.stringify({ player: nowPlayer + 1, buildingId: buildingIds[nowPlayerPosition] }));
                stompClient.current.send(
                    '/pub/1/selectBuilding',
                    {},
                    JSON.stringify({ player: nowPlayer + 1, visit: false, buildingId: buildingIds[nowPlayerPosition] })
                );
                setTradeRealEstate([false, false]);
            }
        }
    }, [tradeRealEstate]);

    return <p>채팅 테스트</p>;
}

export default PlayerSocket;
