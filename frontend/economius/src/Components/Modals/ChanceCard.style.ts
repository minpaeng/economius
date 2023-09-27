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
        top: '225px',
        left: '425px',
        right: '825px',
        bottom: '225px',
        // width:"200px",
        // height:"400px",

        border: '5px solid white',
        borderRadius: '20px',
        padding: '0px',
    },
};

export const ChanceCard = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;

    justify-content: center;
    text-align: center;
`;

export const ChanceCardTop = styled.div`
    flex: 6.5;
    display: flex;
    background: linear-gradient(180deg, #ffdaae 0%, #fff 100%);
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

export const ChanceCardTopTitle = styled.div`
    font-size: 24px;
    font-weight: 700;
`;

export const ChanceCardTopImg = styled.img`
    width: 60%;
    height: 60%;
`;

export const ChanceCardDivide = styled.div`
    flex: 0.2;
    background-color: white;
`;

export const ChanceCardBottom = styled.div`
    flex: 3.3;
    background-color: #b8ef5fe5;
    display: flex;
    flex-direction: column;
    font-size: 20px;
    justify-content: space-evenly;
    align-items: center;
`;
