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
        width: '600px',
        height: '450px',
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
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TopTitle = styled.div`
    font-size: 28px;
    font-weight: 800;
`;

export const Mid = styled.div`
    flex: 5.85;
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
    align-items: center;
`;

export const MidImg = styled.img`
    height: 150px;
`;

export const MidDesc = styled.div`
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const Divide = styled.div`
    flex: 0.15;
    background-color: white;
`;

export const Botton = styled.button`
    flex: 2;
    border: none;
    background: #ffdaae;
    cursor: pointer; /* 커서를 포인터로 설정 */
    transition: all 250ms ease-in-out;

    /* 호버 시 색상 변경 */
    &:hover {
        background: #ffaa55; /* 원하는 색상으로 변경 */
    }
`;
