import Modal from 'react-modal';
import * as S from './BigEvent.style';
import * as SS from './GlobalModal.stye';

import {useRecoilState} from 'recoil';
import {IsModalOpenState} from '/src/recoil/animation/atom';

import {useEffect, useState} from 'react';

function BigEvent({issue}) {
    // 원래는 초기값 false로 두고 해당 턴이 되면 true로 바꿔줘야할듯
    const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpenState);
    const [wordColor, setWordColor] = useState("white");

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (issue.type === "BOOM") {
            setWordColor("black");
        } else {
            setWordColor("white");
        }
    })
    // modal style
    const modalStyle: any = {
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
            //   backgroundColor: "rgba(255,255,255,0.95)",
            overflow: 'auto',
            zIndex: 10,
            top: '80px',
            left: '50px',
            right: '400px',
            bottom: '80px',
            border: `5px solid white`,
            borderRadius: '20px',
            backgroundImage: `url("${issue.url}")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },
    };

    const noneModalStyle: any = {
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
            margin: 'auto',
            width: '500px',
            height: '350px',
            border: '5px solid white',
            borderRadius: '20px',
            padding: '0px',
        },
    };


    function getGoldAndInterestRatesChanges() {
        return <S.BigEventRightChange1>{issue.interestRateChange.assetType} {issue.interestRateChange.changePercentage}%
            / {issue.goldChange.assetType} {issue.goldChange.changePercentage} %</S.BigEventRightChange1>;
    }

    function getStockChanges(index) {
        let description = "";

        for (let i = index * 3; i < index * 3 + 3; i++) {
            description += `${issue.stockChanges[i].stockType} ${issue.stockChanges[i].changePercentage} %  / `
        }

        description = description.slice(0, -2);
        return <S.BigEventRightChange1>{description}</S.BigEventRightChange1>
    }

    return issue.issueId < 0 ?
        <Modal isOpen={isModalOpen} style={noneModalStyle} onRequestClose={closeModal}>
            <SS.Main>
                <SS.Top>
                    <SS.TopTitle>예언소</SS.TopTitle>
                </SS.Top>
                <SS.Mid>
                    <SS.MidDesc>다음 이벤트가 없습니다.</SS.MidDesc>
                </SS.Mid>
            </SS.Main>
        </Modal> : (
        <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
            <S.BigEvent>
                <S.BigEventLeft/>
                <S.BigEventRight style={{color: wordColor}}>
                    <S.BigEventRightTitle>{issue.name}</S.BigEventRightTitle>
                    <S.BigEventRightChange1>{issue.year}</S.BigEventRightChange1>
                    <S.BigEventRightDesc>{issue.description}</S.BigEventRightDesc>
                    <br/>
                    {getGoldAndInterestRatesChanges()}
                    <br/>
                    {getStockChanges(0)}
                    {getStockChanges(1)}
                    {getStockChanges(2)}
                    {getStockChanges(3)}
                    {getStockChanges(4)}
                </S.BigEventRight>
            </S.BigEvent>
        </Modal>
    );
}

export default BigEvent;
