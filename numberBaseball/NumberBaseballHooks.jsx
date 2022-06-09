import React, { useRef, useState, memo } from 'react';
import Try from './TryHooks';

// 숫자 4개를 겹치지않고 랜덤하게 뽑는 함수
// this 를 안쓰는 함수여서 class 밖에 위치시켰음. 안에 넣어도 된다.
// ( 다른데서 이 함수를 쓸 일이 생길 경우 가져다 쓰기 위해서)
const getNumbers = () => {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4 ; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseballHooks = memo(() => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const inputEl = useRef(null);

    const resetGame = () => {
        alert('게임을 다시 시작합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(result !== ''){
            setResult('');
        }

        if(value === answer.join('')){
            setResult('홈런!');
            setTries((prevTries) => (
                [...prevTries, { try: value, result: '홈런!'}]
            ));
            this.resetGame();
        }else{
            const answerArray = value.split('').map( (v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){ // 10번 이상 틀렸을 때
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`);
                this.resetGame();
            }else{
                for(let i = 0; i < 4; i += 1){

                    if( answerArray[i] === answer[i]){
                        strike += 1;
                    } else if( answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                setTries((prevTries) => ([ ...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}]));
                setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return(
        <>
            <h1>{ result }</h1>
            <form onSubmit = { onSubmitForm }>
                <input maxLength = { 4 } value = { value } onChange = { onChangeInput } />
            </form>
            <div>시도: { tries.length }</div>

            <ul>
                {tries.map( (v, i) => {
                    return (
                        <Try key={`${i + 1} 차 시도 :`} tryInfo = { v } index = { i } />
                    );
                })}
            </ul>
        </>
    );
});

export default NumberBaseballHooks; // import NumberBaseballHooks;