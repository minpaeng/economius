import { styled } from 'styled-components';

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
        flexDirection: 'column',
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
        padding: '10px 10px 10px 10px',
        justifyContent: 'center'
    },
};

export const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 78%;
  width: 94%;
  margin-top: 2%;
  border-radius: 20px;
  padding-left: 2%;
  padding-right: 2%;
  //font-size: 50px;
`;

export const InnerTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28%;
  width: 100%;
  margin-top: 2%;
  border-radius: 20px;
  font-size: 50px;
`;

export const PlayerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  width: 100%;
  padding-top: 1%;
`;

export const PrizeDiv = styled.div`
  padding-right: 3%;
  padding-left: 2%;
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlayerInformation = styled.div`
  padding-right: 3%;
  padding-left: 2%;
  height: 100%;
  width: 60%;
  display: flex;
  justify-content: right;
  align-items: center;
  //text-align: right;
  //background-color: black;
`;
