import { useRecoilState } from 'recoil';
import { TradeInsuranceState } from '/src/recoil/trading/atom';
import * as S from './InsuranceCard.style';
import InsuranceCardItem from './InsuranceCardItem';

function InsuranceCard({ CardInfo, index }) {
    const [tradeInsurance, setTradeInsurance] = useRecoilState(TradeInsuranceState);

    return (
        <S.CardLayout>
            <S.CardMain>
                <S.CardMainTop>
                    <div>{CardInfo.title}</div>
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
                    <div>보장 정도 : {CardInfo.ensurePercent}%</div>
                </S.CardMainTop>
                <div style={{ textAlign: 'center' }}>
                    <hr style={{ width: '80%', margin: '0 10%' }} />
                </div>
                <S.CardMainBottom>
                    {CardInfo.ensureInfo.map(item => {
                        return <InsuranceCardItem img_path={item[1]} name={item[0]} />;
                    })}
                </S.CardMainBottom>
            </S.CardMain>
            <S.CardDivide />
            {CardInfo.isJoin ? <S.CancelButton>해지</S.CancelButton> : <S.JoinButton>가입</S.JoinButton>}
        </S.CardLayout>
    );
}

export default InsuranceCard;
