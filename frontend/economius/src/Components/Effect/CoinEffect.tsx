import { useState, useEffect } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useRecoilState } from 'recoil';
import { CoinEffectState, CoinEffectIndexState } from '/src/recoil/Effect/atom';
import dollarcoin from '/BeforeBankrupt/dollarcoin.png';

// 설정값 변수
const numberOfCoins = 8;
const interval = 100;
const top = '50%';
const left = 'calc(37.5% - 9px)';
// 초기 위치
const from = (_i: number) => ({ x: '0%', y: `${_i * -0.25}%`, scale: 1 });
const from1 = (_i: number) => ({ x: '-33.5%', y: '-35%', scale: 1 });
const from2 = (_i: number) => ({ x: '33.5%', y: '-35%', scale: 1 });
const from3 = (_i: number) => ({ x: '-33.5%', y: '40%', scale: 1 });
const from4 = (_i: number) => ({ x: '33.5%', y: '40%', scale: 1 });
const initialLocation = { 1: from, 2: from, 3: from, 4: from, 5: from1, 6: from2, 7: from3, 8: from4 };
// 이동 위치
const to1 = (i: number) => ({ x: '-33.5%', y: '-35%', scale: 1, delay: i * interval });
const to2 = (i: number) => ({ x: '33.5%', y: '-35%', scale: 1, delay: i * interval });
const to3 = (i: number) => ({ x: '-33.5%', y: '40%', scale: 1, delay: i * interval });
const to4 = (i: number) => ({ x: '33.5%', y: '40%', scale: 1, delay: i * interval });
const tofrom = (i: number) => ({ x: '0%', y: '0%', scale: 1, delay: i * interval });
const effectFunction = { 1: to1, 2: to2, 3: to3, 4: to4, 5: tofrom, 6: tofrom, 7: tofrom, 8: tofrom };
const trans = (s: number) => `perspective(1500px) scale(${s})`;

function Coins({ effectIdx }) {
    const [gone] = useState(() => new Set());
    const [props, api] = useSprings(numberOfCoins, i => {
        const springConfig = initialLocation[effectIdx](i);
        return springConfig || null;
    });

    const move = to => {
        gone.clear();
        api.start(i => to(i));
    };

    useEffect(() => {
        gone.clear();
        move(effectFunction[effectIdx]); // 해당 동전 효과 재생
    }, []);

    return (
        <>
            {props.map(({ x, y, scale }, i) => (
                <animated.div key={i} style={{ position: 'absolute', top: top, left: left, width: '100%', height: '100%', x, y, zIndex: 20 }}>
                    <animated.div style={{ transform: interpolate([scale], trans) }}>
                        <img style={{ width: '18px', height: '20px' }} src={dollarcoin} alt='' />
                    </animated.div>
                </animated.div>
            ))}
        </>
    );
}

function CoinEffect() {
    const [effect, setEffect] = useRecoilState(CoinEffectState); // 코인 효과 여부
    const [effectIdx, setEffectIdx] = useRecoilState(CoinEffectIndexState); // 코인 효과 번호

    useEffect(() => {
        if (!effect) return;
        setTimeout(() => {
            setEffect(false);
        }, 1500); // 1.5초 후 동전 효과 사라짐
    }, [effect]);

    // const coinBtnClick = num => {
    //     if (effect) return;
    //     setEffectIdx(num);
    //     setEffect(true); // 동전 효과 시작
    // };

    return (
        <>
            {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((number, index) => (
                <button
                    key={index}
                    onClick={() => coinBtnClick(number)}
                    style={{
                        position: 'absolute',
                        bottom: '30%',
                        left: `${29 + index * 2}%`,
                        background: effect ? 'orange' : null,
                    }}
                >
                    {number}
                </button>
            ))} */}
            {effect ? <Coins effectIdx={effectIdx} /> : null}
        </>
    );
}

export default CoinEffect;
