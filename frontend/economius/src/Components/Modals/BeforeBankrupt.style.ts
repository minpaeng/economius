import { styled } from 'styled-components';

// modal style
export const modalStyle: any = {
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
        width: '400px',
        height: '600px',
        border: '5px solid white',
        borderRadius: '20px',
        padding: '0px',
    },
};

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #fff9ee;
`;

export const Top = styled.div`
    flex: 1.15;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TopTitle = styled.div`
    font-size: 22px;
    font-weight: 800;
`;

export const Mid = styled.div`
    flex: 5.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    margin: 0 auto;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    overflow: hidden;
`;

export const MidTitle = styled.div`
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 800;
`;

export const MidScroll = styled.div`
    margin-top: 15px;
    width: 98%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 6px; /* 스크롤바의 너비를 조절할 수 있습니다. */
    }

    /* 스크롤바 트랙 (배경) 스타일링 */
    &::-webkit-scrollbar-track {
        background: transparent; /* 스크롤바 트랙의 배경색을 설정할 수 있습니다. */
    }

    /* 스크롤바 색상 스타일링 */
    &::-webkit-scrollbar-thumb {
        background: #999; /* 스크롤바의 색상을 설정할 수 있습니다. */
        border-radius: 5px; /* 스크롤바의 모서리를 둥글게 만듭니다. */
    }

    /* 스크롤바가 오른쪽 끝에 도달할 때 스타일링 */
    &::-webkit-scrollbar-thumb:hover {
        background: #888; /* 스크롤바를 호버할 때의 색상을 설정할 수 있습니다. */
    }
`;

export const MidItem = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
`;

export const MidCheck = styled.div`
    position: relative;
    border: 1px solid black;
    border-radius: 2px;
    width: 20px;
    height: 20px;
`;

export const MidCheckImg = styled.img`
    position: absolute;
    border: 1px solid red;
    left: 0px;
    height: 20px;
    width: 20px;
`;

export const MidImg = styled.img`
    height: 30px;
    margin-left: 30px;
`;

export const MidDesc = styled.div`
    width: 80px;
    font-size: 14px;
    margin-left: 4px;
    text-align: center;
`;

export const MidCalc = styled.div`
    flex: 2.7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MidCalcDesc = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    font-size: 16px;
`;

export const CoinImg = styled.img`
    height: 20px;
    margin-left: 5px;
`;

export const Divide = styled.div`
    flex: 0.15;
    background-color: white;
`;

export const Button = styled.button<{ can: boolean }>`
    flex: 1;
    border: none;
    background: #ffdaae;
    cursor: pointer; /* 커서를 포인터로 설정 */
    transition: all 250ms ease-in-out;
    background: ${({ can }) => (can ? '#ffaa55' : '#D9D9D9')}; /* 원하는 색상으로 변경 */
`;
