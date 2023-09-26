import Modal from 'react-modal';
import { useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { IsModalOpenState } from '/src/recoil/animation/atom';
// import financecenterimg from '/FinanceCenter/financecenter.png';
import * as S from './GlobalModal.stye';

export default function StartLoginCheck({ videoControl }) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // modal style
    const modalStyle: any = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 10,
        },
        content: {
            display: 'flex',
            flexDirextion: 'column',
            backgroundColor: 'rgba(255,255,255,0.95)',
            overflow: 'auto',
            zIndex: 10,
            margin: 'auto',
            width: '700px',
            height: '480px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };

    return (
        <Modal isOpen={isModalOpen} style={modalStyle}>
            <S.Main>
                <S.Top>
                    <S.TopTitle>로그인이 완료되었습니다!</S.TopTitle>
                </S.Top>

                <S.MidNoImg>
                    <S.MidDesc>
                        이 게임은 픽션이며 등장하는 인물, 단체, 지명 등은 실존하는 것과 일체 관계없습니다.
                        <br />
                        <br />
                        즐기면서 배우는 경제, Enjoy Economious!
                        <br />
                        <br />
                        (※ FHD 이상의 환경에서 F11(전체화면)으로 플레이하시는 것을 권장합니다.)
                        <br />
                    </S.MidDesc>
                </S.MidNoImg>

                <S.Divide />
                <S.Button
                    onClick={() => {
                        videoControl();
                        closeModal();
                    }}
                >
                    확인
                </S.Button>
            </S.Main>
        </Modal>
    );
}
