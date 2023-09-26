import Modal from 'react-modal';
import * as S from './WaitRoom.style';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { RoomIdState } from '/src/recoil/animation/atom';

export default function WaitRoom(props) {
    const [roomid, setRoomid] = useRecoilState(RoomIdState);
    const [isModalOpen, setIsModalOpen] = useState(true);
    // const [isHost, setIsHost] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const exitHandler = () => {
        // 접속한 방이 없다고 초기화
        setRoomid(0);

        // 모달 끄기
        props.setShowWaitRoom(false);
        setIsModalOpen(true);

        console.log('exit');
    };

    return (
        <>
            <Modal isOpen={isModalOpen} style={S.modalStyle}>
                <S.UserBoxOuter>
                    <S.UserBox></S.UserBox>
                    <S.UserBox></S.UserBox>
                    <S.UserBox></S.UserBox>
                    <S.UserBox></S.UserBox>
                    <S.InfoBar>
                        <div className='no'>
                            <span>Room No : {roomid} </span>
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
