import styled from 'styled-components';

const CardItem = styled.div`
    margin: 1px 0;
    display: flex;
    justify-content: center;
    width: 70%;
`;

const CardItemImg = styled.img`
    width: 20px;
    margin-right: 10px;
`;

const CardItemeDesc = styled.div``;

function InsuranceCardItem({ img_path, name }) {
    return (
        <CardItem>
            <CardItemImg src={`Insurance/${img_path}.png`} alt='img' />
            <CardItemeDesc>{name}</CardItemeDesc>
        </CardItem>
    );
}

export default InsuranceCardItem;
