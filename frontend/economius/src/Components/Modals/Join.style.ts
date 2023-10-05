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
        // backgroundColor: 'rgba(255,255,255,0.85)',
        backgroundColor: '#fff9ee',
        overflow: 'auto',
        zIndex: 10,
        margin: 'auto',
        width: '500px',
        height: '400px',
        border: '5px solid white',
        borderRadius: '20px',
        // padding: '100px 50px 50px 50px',
        padding: '0px 0px 0px 0px',
    },
};

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #fff9ee;
`;

// export const BankTop = styled.div`
//     flex: 2;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;

// export const BankTopTitle = styled.div`
//     font-size: 28px;
//     font-weight: 800;
// `;

export const Mid = styled.div`
    flex: 7.85;
    display: flex;
    flex-direction: column;
    /* justify-content: flex-start; */
    justify-content: space-evenly;
    align-items: center;

    input {
        width: 50%;
        height: 30px;
        font-size: 20px;
    }
`;

export const MidImg = styled.img`
    width: 200px;
`;

export const MidDesc = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

export const BankDivide = styled.div`
    flex: 0.15;
    background-color: white;
`;

export const BankJoinBottom = styled.button`
    flex: 2;
    border: none;
    background: #ffdaae;
    cursor: pointer; /* 커서를 포인터로 설정 */
    transition: all 250ms ease-in-out;

    font-size: 24px;

    /* 호버 시 색상 변경 */
    &:hover {
        background: #ffaa55; /* 원하는 색상으로 변경 */
    }
`;

export const BankCancelBottom = styled.button`
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

export const ExitButton = styled.img`
    position: absolute;
    top: 17px;
    right: 17px;
`;
