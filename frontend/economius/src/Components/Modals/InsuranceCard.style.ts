import styled from 'styled-components';

export const CardLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 170px;
    height: 90%;
    padding: 8px 12px;
`;

export const CardMain = styled.div`
    flex: 8;
    border: 1px solid black;
    border-radius: 12px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(131, 129, 129, 0.2);
    background: rgb(251, 251, 251);
    display: flex;
    flex-direction: column;
`;

export const CardMainTop = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

export const InsuranceName = styled.div`
    font-size: 20px; // 원하는 폰트 사이즈로 설정
`;

export const CardMainTopPrice = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CardMainBottom = styled.div`
    flex: 7;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`;

export const CardDivide = styled.div`
    flex: 0.7;
`;

export const JoinButton = styled.button`
    flex: 1.3;
    border: 1px solid black;
    border-radius: 12px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(131, 129, 129, 0.2);
    /* 임시색상 */
    background: #5cb85c;
    transition: all 250ms ease-in-out;

    &:hover {
        cursor: pointer;
        color: white;
    }
`;
export const CancelButton = styled.button`
    flex: 1.3;
    border: 1px solid black;
    border-radius: 12px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(131, 129, 129, 0.2);
    /* 임시색상 */
    background: #d9534f;

    transition: all 250ms ease-in-out;

    &:hover {
        cursor: pointer;
        color: white;
    }
`;
