import React, { useState, useRef, useEfect, useEffect } from 'react';
import useInterval from "./useInterval";

// class 밖에 얘네 나와있는 이유 : state가 안쓰이고있어서 render안시켜도되기때문!!!!
const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    // entries : 객체가 가진 모든 프로퍼티를 키와 값 쌍으로 배열 형태로 반환한다.
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
};

const RSPHooks = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const [isRunning, setIsrunning] = useState(true);
    // const interval = useRef();

    // // useEffect : componentDidMound, coponentDidUpdate 의 역할을 한다.(1:1 대응은 아님. 이 둘을 합쳐놓은것)
    // // 두번째 배열에 useEffect를 실행하고싶은 state를 넣어서 closer 문제를 해결할 수 있음.
    // //  return 안의 로직은 두번째 배열의 값이 바뀔 때 마다 실행된다.
    // // 두번째 배열을 비워두면, 어떤 state가 바뀌든 신경쓰지 않고 처음에 딱 한번만 실행된다.
    // // 배열에 , , 로 여러개 넣어도 된다.
    // useEffect(() => {
    //     interval.current = setInterval(changeHand, 100);

    //     // return 안에 로직이 componentWillUnmount 역할.
    //     return() => {
    //         clearInterval(interval.current);
    //     }
    // }, [imgCoord]);

    const changeHand = (choice) => {
        // const {imgCoord} = this.state;

        if(imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위);

        }else if(imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보);

        }else if(imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위);
        }
    }

    useInterval(changeHand, isRunning ? 100 : null);

    const onClickBtn = (choice) => () => {
        
        // 1. 잠시 멈춘다.
        // clearInterval(interval.current); 
        setIsrunning(false);

        // 2. 점수 계산
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0 ){
            setResult('비겼습니다.');
        }else if([-1, 2].includes(diff)){
            setResult('이겼습니다!^0^');
            setScore((prevScore) => prevScore + 1);
        }else{
            setResult('졌습니다!ㅜㅜ');
            setScore((prevScore) => prevScore - 1);
        }
        // 3. 1초 후에 다시 손을 움직이게 한다.
        setTimeout(() => {
            setIsrunning(true);
            // interval.current = setInterval(changeHand, 100);
        }, 1000)
    }

    return (
        <>
            <div id="computer" style= {{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    )
}

export default RSPHooks;