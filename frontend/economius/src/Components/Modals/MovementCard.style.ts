import styled from 'styled-components';

export const modalStyle: any = {
    overlay: {
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.0)',
        zIndex: 10,
        margin: 'auto',
    },
    content: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        overflow: 'hidden',
        zIndex: 10,
        margin: 'auto',
        right: '25%',
        width: '500px',
        height: '370px',
        border: '5px solid white',
        borderRadius: '20px',
        padding: '0px',
    },
};

export const Number = styled.div`
    display: flex;
    font-size: 40px;
    color: green;
`;

export const Button = styled.div`
    margin: 0 auto;
    margin-top: 290px;
    width: 25%;
    padding: 12px 15px;
    border-radius: 20px;
    background: #ffdaae;
    text-align: center;
    &:hover {
        background: #ffaa55;
    }
`;

export const DisButton = styled.div`
    margin: 0 auto;
    margin-top: 290px;
    width: 50%;
    padding: 11px 15px;
    border-radius: 20px;
    background: #d9d9d9;
    text-align: center;
`;

export const Caution = styled.div`
    display: flex;
    position: absolute;
    bottom: 3%;
    left: 50%;
    transform: translateX(-50%);
    color: gray;
    font-size: 10px;
`;
