import styled from 'styled-components';

export const modalStyle: any = {
    overlay: {
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 10,
    },
    content: {
        backgroundColor: 'rgba(255,255,255,0.55)',
        overflow: 'hidden',
        zIndex: 10,
        margin: 'auto',
        right: '29%',
        width: '500px',
        height: '350px',
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
    display: flex;
    position: absolute;
    bottom: 9%;
    left: 50%;
    transform: translateX(-50%);
    padding: 11px 15px;
    border-radius: 20px;
    background: #ffdaae;
    &:hover {
        background: #ffaa55;
    }
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
