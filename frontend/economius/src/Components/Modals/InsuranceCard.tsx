import { useRecoilState } from 'recoil';
import { TradeInsuranceState } from '/src/recoil/trading/atom';
import { InsuranceInfoState } from '/src/recoil/modalInfo/atom';
import * as S from './InsuranceCard.style';
import InsuranceCardItem from './InsuranceCardItem';
import { useEffect } from 'react'; // 추가: useEffect를 import 해주세요.

const insureanceIds = {
    3: 0,
    4 :1,
    1: 2,
    2: 3,
};

function InsuranceCard({ CardInfo, ItemInfo, index }) {
    const [tradeInsurance, setTradeInsurance] = useRecoilState(TradeInsuranceState);
    const [insuranceInfo, setInsuranceInfo] = useRecoilState(InsuranceInfoState);
    // useEffect를 추가하여 tradeInsurance 값이 변경될 때마다 로깅
    useEffect(() => {
        console.log('Updated tradeInsurance: ', tradeInsurance);
    }, [tradeInsurance]);

    // 가입/해지 값에 따라 버튼을 토글하는 함수
    const handleButtonClick = () => {
        console.log("Toggled Index: ", index); // 클릭된 인덱스 로깅
        console.log("Corresponding insureanceId: ", insureanceIds[index]); // 해당하는 insureanceIds 로깅
        setTradeInsurance(prev => {
            const newState = [...prev];
            newState[insureanceIds[index]] = !newState[insureanceIds[index]];
            return newState;
        });
    };

    return (
        <S.CardLayout>
            <S.CardMain>
                <S.CardMainTop>
                    <div>{CardInfo.getInsuranceName}</div>
                    <S.CardMainTopPrice>
                        <p>월 보험료 : {CardInfo.perPrice}</p>
                        <img
                            src='Bank/dollar-coin 15.png'
                            alt='img'
                            style={{
                                width: '25px',
                                height: '25px',
                                marginLeft: '5px',
                            }}
                        />
                    </S.CardMainTopPrice>
                    <div>보장 정도 : {CardInfo.insuranceBenefit}%</div>
                </S.CardMainTop>
                <div style={{ textAlign: 'center' }}>
                    <hr style={{ width: '80%', margin: '0 10%' }} />
                </div>
                <S.CardMainBottom>
                    {ItemInfo.map((item, key) => {
                        return <InsuranceCardItem key={key} img_path={item[1]} name={item[0]} />;
                    })}
                </S.CardMainBottom>
            </S.CardMain>
            <S.CardDivide />
            {tradeInsurance[insureanceIds[index]] ? (
                <S.CancelButton onClick={handleButtonClick}>해지</S.CancelButton>
            ) : (
                <S.JoinButton onClick={handleButtonClick}>가입</S.JoinButton>
            )}
        </S.CardLayout>
    );
}

export default InsuranceCard;
