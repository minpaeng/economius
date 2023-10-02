import Modal from 'react-modal';
import * as S from './WaitRoom.style';
import { useRecoilState } from 'recoil';
import {
    GameButtonState,
    RoomCountState,
    RoomExitState,
    RoomHostState,
    RoomIdState,
    RoomJoinState,
    RoomJoinUsersNicknameState,
    SetShowWaitRoomState,
} from '/src/recoil/animation/atom';
import { useEffect, useState } from 'react';

export default function WaitRoom() {
    const [roomid, setRoomid] = useRecoilState(RoomIdState);
    const [isModalOpen, setIsModalOpen] = useState(true);
    // const [isHost, setIsHost] = useState(false);
    const [roomJoinUsersNickname, setRoomJoinUsersNickname] = useRecoilState(RoomJoinUsersNicknameState);
    const [showWaitRoom, setShowWaitRoom] = useRecoilState(SetShowWaitRoomState);
    const [roomHost, setRoomHost] = useRecoilState(RoomHostState);
    const [roomJoin, setRoomJoin] = useRecoilState(RoomJoinState);
    const [roomCount, setRoomCount] = useRecoilState(RoomCountState);
    const [roomExit, setRoomExit] = useRecoilState(RoomExitState);
    const [gameButton, setGameButton] = useRecoilState(GameButtonState);

    useEffect(() => {
        console.log('hi');
        // setRoomJoin(1);
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const exitHandler = () => {
        setRoomExit(true);

        // 모달 끄기
        setShowWaitRoom(false);
        setTimeout(() => {
            // 접속한 방이 없다고 초기화
            setRoomid(0);
            setRoomJoinUsersNickname(['', '', '', '']);

            setRoomHost(0);
            setRoomJoin(0);
            setRoomCount(0);
        }, 500);
    };

    // 룸 번호 복사
    const roomNumHandler = () => {
        // here
        const tempElement = document.createElement('textarea');
        document.body.appendChild(tempElement);
        tempElement.value = String(roomid);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);
        alert('방 번호가 복사되었습니다.');
        console.log('wow');
    };

    const startHandler = () => {
        console.log('시작 버튼 눌렸다아아아아아아아');

        setGameButton(true);

        // const [gameButton, setGameButton] = useRecoilState(GameButtonState);
    };

    return (
        <>
            <Modal isOpen={isModalOpen} style={S.modalStyle}>
                <S.UserBoxOuter>
                    <S.UserBox>
                        <img src='/roomImg/wait.png' alt='user-img'></img>
                        <p>{roomJoinUsersNickname[0]}</p>
                    </S.UserBox>
                    <S.UserBox>
                        <img src='/roomImg/wait.png' alt='user-img'></img>
                        <p>{roomJoinUsersNickname[1]}</p>
                    </S.UserBox>
                    <S.UserBox>
                        <img src='/roomImg/wait.png' alt='user-img'></img>
                        <p>{roomJoinUsersNickname[2]}</p>
                    </S.UserBox>
                    <S.UserBox>
                        <img src='/roomImg/wait.png' alt='user-img'></img>
                        <p>{roomJoinUsersNickname[3]}</p>
                    </S.UserBox>
                    <S.InfoBar>
                        <div onClick={roomNumHandler} className='no'>
                            <span>Room No : {roomid} </span>
                            <img src='/navImg/copy.png' alt='' style={{ width: '20px', paddingLeft: '5px' }} />
                        </div>

                        <span>
                            {roomHost === Number(localStorage.getItem('player')) ? (
                                roomCount >= 4 ? (
                                    <span>
                                        <div style={{ cursor: 'pointer' }} onClick={startHandler}>
                                            Start
                                        </div>
                                    </span>
                                ) : (
                                    <span className='overlay-outer'>
                                        <div style={{ cursor: 'not-allowed' }}>Start</div>
                                        <p className='overlay-inner'>3인 이하는 플레이가 불가능합니다</p>
                                    </span>
                                )
                            ) : (
                                <span className='overlay-outer'>
                                    <div style={{ cursor: 'not-allowed' }}>Start</div>
                                    <p className='overlay-inner'>방장만 시작이 가능합니다</p>
                                </span>
                            )}
                            <div onClick={exitHandler}>Exit</div>
                        </span>
                    </S.InfoBar>
                </S.UserBoxOuter>
            </Modal>
        </>
    );
}
