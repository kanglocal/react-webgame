import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

// state 안 쓰는 애들 분리하기
function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return [...winNumbers, bonusNumber];
}

const LottoHooks = () => {

    // useMemo : 두번째 인자의 요소가 바뀌지 않는 한, 다시 실행되지 않는다.
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        for(let i = 0; i < winNumbers.length - 1; i ++){ // let i 로 하면 closer 문제가 생기지 않는다.
            // timeouts.current[i] = x >> 이렇게 하는건 바뀌는거라고 감지 못한다. current 배열의 요소를 변경하기때문.
            // 바뀌는걸 감지하는 때는, timeouts = [x] >> 이렇게 할 때임.
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 500);
        }
        
        // 보너스 공
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 3500);

        return ()=> {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        }
    }, [timeouts.current]);


    // // useCallback 예시
    // const onClickRedo = useCallback(() => {
    //     // 기존 state 초기화
    //     setWinNumbers(getWinNumbers());
    //     setWinBalls([]);
    //     setBonus(null);
    //     setRedo(false);
    //     timeouts.current = [winNumbers];
    // }, []);

      const onClickRedo = () => {
        // 기존 state 초기화
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [winNumbers];
    };

    return (
        <>
            <div>당첨 숫자</div>
            {/* 반복문은 자식컴포넌트로 나누는 좋은 기점이 된다. */}
            <div id="resultDiv">
                { winBalls.map((v) => <Ball key={v} number={v} />) }
            </div>
            <div>보너스!</div>
            { bonus && <Ball number = {bonus} /> }
            { redo && <button onClick = { onClickRedo}>한 번 더!</button>}
        </>
    );
};


export default LottoHooks;