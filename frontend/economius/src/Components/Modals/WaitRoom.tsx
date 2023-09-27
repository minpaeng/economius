import Modal from 'react-modal';
import * as S from './WaitRoom.style';
import { useRecoilState } from 'recoil';
import { RoomIdState, RoomJoinState, RoomJoinUsersNicknameState } from '/src/recoil/animation/atom';
import { useEffect, useRef, useState } from 'react';

export default function WaitRoom(props) {
    const [roomid, setRoomid] = useRecoilState(RoomIdState);
    const [isModalOpen, setIsModalOpen] = useState(true);
    // const [isHost, setIsHost] = useState(false);
    const [roomJoinUsersNickname, setRoomJoinUsersNickname] = useRecoilState(RoomJoinUsersNicknameState);

    useEffect(() => {
        console.log('hi');
        // setRoomJoin(1);
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const exitHandler = () => {
        // 접속한 방이 없다고 초기화
        setRoomid(0);
        setRoomJoinUsersNickname(['', '', '', '']);

        // 모달 끄기
        props.setShowWaitRoom(false);
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

    return (
        <>
            <Modal isOpen={isModalOpen} style={S.modalStyle}>
                <S.UserBoxOuter>
                    <S.UserBox>
                        <img src='/navImg/hola.png' alt='user-img'></img>
                        <p>{roomJoinUsersNickname[0]}</p>
                    </S.UserBox>
                    <S.UserBox>
                        <img src='/navImg/hola.png' alt='user-img'></img>
                        <p>{roomJoinUsersNickname[1]}</p>
                    </S.UserBox>
                    <S.UserBox>
                        <img src='/navImg/hola.png' alt='user-img'></img>
                        <p>{roomJoinUsersNickname[2]}</p>
                    </S.UserBox>
                    <S.UserBox>
                        <img src='/navImg/hola.png' alt='user-img'></img>
                        <p>{roomJoinUsersNickname[3]}</p>
                    </S.UserBox>
                    <S.InfoBar>
                        <div className='no'>
                            <span onClick={roomNumHandler}>Room No : {roomid} </span>
                            <img src='/navImg/copy.png' alt='' style={{ width: '20px', paddingLeft: '5px' }} />
                        </div>

                        <span>
                            <div>Start</div>
                            <div onClick={exitHandler}>Exit</div>
                        </span>
                    </S.InfoBar>
                </S.UserBoxOuter>
            </Modal>
        </>
    );
}
