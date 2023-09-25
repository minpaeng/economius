import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import video1 from '/video/video_start.mp4'; // 1080p
import video3 from '/video/video_repeat.mp4'; // sound
import StartAccess from './Components/Modals/StartAccess';
import * as S from '../src/Components/Modals/GlobalModal.stye';
import { UseridState } from './recoil/animation/atom';
import { useRecoilState } from 'recoil';
import Modal from 'react-modal';

export default function Index() {
    // 최상단 컴포넌트에서 모달을 쓸 것이라고 명시 작업이 필요
    Modal.setAppElement('#root');

    // recoil
    const [userid, setUserid] = useRecoilState(UseridState);
    // const memberType = useRecoilValue(memberTypeAtom);
    // const settermemberName = useSetRecoilState(memberNameAtom); // react setState와 동일하게 동작함

    const videoRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true);
    const [isMuted, setIsMuted] = useState(true); // 비디오 음소거 상태
    const [currentVideo, setCurrentVideo] = useState(video1);

    // 모달 열기
    const openModal = () => {
        setIsOpen(true);
        // 모달이 열릴 때, 다른 스크립트를 일시정지하거나 제어 가능
    };

    // 모달 닫기
    const closeModal = () => {
        setIsOpen(false);
    };

    // 모달이 닫히면 적용
    useEffect(() => {
        if (!isOpen) {
            const videoElement = videoRef.current;

            // 비디오를 로드하고 로드가 완료되면 비디오를 재생합니다.
            videoElement.src = currentVideo;

            // 비디오가 로드될 때마다 실행되는 이벤트 핸들러
            const handleLoadedData = () => {
                // 비디오를 재생하고 루프로 설정합니다.
                videoElement.play();
                videoElement.muted = !isMuted; // 비디오 음소거 상태를 반전시킴
                setIsMuted(!isMuted);

                // setTimeout(() => {
                //     setIsMuted(!isMuted);
                // }, 1000);
                videoElement.loop = true;

                // 비디오 1의 로드 이벤트 핸들러를 제거합니다.
                videoElement.removeEventListener('loadeddata', handleLoadedData);

                // 비디오 1을 재생한 후, 10초 후에 비디오 2로 변경합니다.
                setTimeout(() => {
                    console.log('hello');
                    setCurrentVideo(video3);
                }, 2000);
            };

            // 비디오 1의 로드 이벤트 핸들러를 추가합니다.
            videoElement.addEventListener('loadeddata', handleLoadedData);

            // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
            return () => {
                videoElement.removeEventListener('loadeddata', handleLoadedData);
            };
        }
    }, [currentVideo]);

    // 시작하자마자 모달 열기
    useEffect(() => {
        openModal();
    }, []);

    // 소리 허용 버튼을 클릭했을 때 실행
    const videoControl = () => {
        // 기존 적용된 비디오 실행
        const videoElement = videoRef.current;
        videoElement.play();
        // 상태 업데이트
        closeModal();

        // 비디오 1을 재생한 후, 10초 후에 비디오 2로 변경합니다.
        setTimeout(() => {
            setCurrentVideo(video3);
        }, 2000);
    };

    // {!!!!!!!!!!!!!!!!!!!!} 카카오 로그인 시 실행할 함수
    const loginHandler = () => {
        setUserid('shin');
        setTimeout(() => {
            console.log(userid);
            console.log('안녕하세요');
        }, 5000);
    };

    // {!!!!!!!!!!!!!!!!!!!!} 카카오 로그인 시 실행할 함수
    const roomJoinHandler = () => {
        //
    };

    // {!!!!!!!!!!!!!!!!!!!!} 카카오 로그인 시 실행할 함수
    const roomMakeHandler = () => {
        //
    };

    return (
        <>
            <video muted={isMuted} ref={videoRef} loop>
                <source src={video1} type='video/mp4' />
            </video>
            <div className='content'>
                {/* 화면 처음 들어오면 자동으로 켜지는 모달 */}
                {isOpen && (
                    <>
                        <StartAccess videoControl={videoControl} />
                    </>
                )}
                {/* <Link to={`/room`}>
                    <h1>room</h1>
                </Link> */}

                {userid === 'a' ? (
                    <S.ButtonOuter>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img onClick={loginHandler} src='/button/kakao.png' alt='kakao-login-btn' />
                        </div>
                        {/* <S.RoundButtonRoom onClick={loginHandler}>
                            <span>카카오톡 로그인</span>
                        </S.RoundButtonRoom> */}
                    </S.ButtonOuter>
                ) : (
                    <S.ButtonOuter>
                        <S.RoundButtonRoom onClick={roomMakeHandler}>
                            <span>방 생성하기</span>
                        </S.RoundButtonRoom>
                        <S.RoundButtonRoom onClick={roomJoinHandler}>
                            <span>방 입장하기</span>
                        </S.RoundButtonRoom>
                    </S.ButtonOuter>
                )}
            </div>
        </>
    );
}
