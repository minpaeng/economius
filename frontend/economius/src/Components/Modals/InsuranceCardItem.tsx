import styled from "styled-components";

const CardItem = styled.div`
  display: flex;
  width: 70%;
  justify-content: flex-start;
`;

const CardItemImg = styled.img`
  width: 20px;
  margin-right: 10px;
`;

const CardItemeDesc = styled.div``;

function InsuranceCardItem({ img_path, name }) {
  return (
    <CardItem>
      <CardItemImg src={`Insurance/${img_path}.png`} alt="img" />
      <CardItemeDesc>{name}</CardItemeDesc>
    </CardItem>
  );
}

export default InsuranceCardItem;
