import { styled } from 'styled-components';

export const modalStyle: any = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 10,
    },
    content: {
        display: "flex",
        flexDirextion: "column",
        backgroundColor: "rgba(255,255,255,0)",
        overflow: "auto",
        zIndex: 10,
        top: "150px",
        left: "150px",
        right: "550px",
        bottom: "150px",
        border: "none",
        borderRadius: "20px",
        padding: "0px",
        justifyContent: "center",
        alignItems: "center",
    },
}


export const TextOverlay = styled.div`
  position: absolute; /* 텍스트를 상대 위치로 설정 */
  top: 66%; /* 상단 여백을 50%로 설정 */
  left: 45%; /* 좌측 여백을 50%로 설정 */
  //transform: translate(-50%, -50%); /* 텍스트를 중앙에 배치 */
  //background-color: rgba(255, 255, 255, 0.7); /* 텍스트 배경 색상 설정 */
  padding: 10px; /* 텍스트 주위 여백 설정 */
`;

export const Img = styled.img`
  position: relative; /* 이미지 컨테이너를 상대 위치로 설정 */
  display: inline-block; /* 컨테이너 크기를 이미지 크기에 맞춤 */
  max-width: 100%;
  max-height: 100%;
`
