import Modal from 'react-modal';
import * as S from './WaitRoom.style';
import { useState } from 'react';

export default function WaitRoom() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isHost, setIsHost] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // modal style
    // const modalStyle: any = {
    //     overlay: {
    //         position: 'fixed',
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //         backgroundColor: 'rgba(0,0,0,0.6)',
    //         zIndex: 10,
    //     },
    //     content: {
    //         display: 'flex',
    //         flexDirextion: 'column',
    //         backgroundColor: 'rgba(255,255,255,0.95)',
    //         overflow: 'auto',
    //         zIndex: 10,
    //         margin: 'auto',
    //         width: '700px',
    //         height: '480px',
    //         // top: '100px',
    //         // left: '400px',
    //         // right: '400px',
    //         // bottom: '100px',
    //         border: '5px solid white',
    //         borderRadius: '20px',
    //         padding: '0px',
    //     },
    // };

    return (
        <>
            <Modal isOpen={isModalOpen} style={S.modalStyle}>
                <S.UserBoxOuter>
                    <S.UserBox></S.UserBox>
                    <S.UserBox></S.UserBox>
                    <S.UserBox></S.UserBox>
                    <S.UserBox></S.UserBox>
                    <S.InfoBar>
                        <span>
                            <div className='no'>Room No : 000000</div>
                            <div>Copy</div>
                        </span>
                        {isHost ? <div>Game Start</div> : <div>Exit</div>}
                    </S.InfoBar>
                </S.UserBoxOuter>
            </Modal>
        </>
    );
}
