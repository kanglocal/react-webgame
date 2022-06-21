import React, {useState, useRef} from 'react';

const ResponseCheckHooks = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [ result, setResult] = useState([]);
    // this 의 속성들을 ref 로 적는다.
    // ref 이기때문에 current를 적어야함!!
    // [state 와 ref 의 차이?
    // state 는 return 부분이 다시 실행된다.
    // ref는 return부분이 다시 실행되지 않는다. 
    // 불필요한 렌더링은 막아야 한다!!
    // 따라서 state는 값이 바뀐걸 화면에 바로 표시해야하는것.
    // ref는 값이 바뀌기는 하지만 화면에는 영향을 미치지 않을 때.]
    const timeOut = useRef(null);
    const startTime = useRef();
    const endTime = useRef();


    const onClickScreen = () => {
        
        
        if(state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');

            timeOut.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000 ) + 2000); //2~3초 랜덤
        } else if(state === 'ready') {
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.')
        } else if ( state === 'now') { //반응속도 체크
            endTime.current = new Date();
            setState('waiting');
                setMessage('클릭해서 시작하세요.');
                setResult((prevResult) => {
                    return [...prevResult, endTime.current - startTime.current]
                });
        }
    };

    const onReset = () => {
        setResult([]);
    }

    const renderAverage = () => {
        return result.length === 0 
                ? null 
                : <>
                    <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                    <button onClick= {onReset}>리셋</button>
                  </>
    }

    return (
        // render 함수의 rutrn 안에는 jsx가 오고, jsx 안에서는 for과 if를 못쓴다.
        // jsx 에서는 아무것도 없다 = null 이다.
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}    
            >
                {message}
            </div>
            
            {/* return 안에 if , else 쓰기 */}
            {/* {
                (() => {
                    if(result.length === 0) {
                        return null;
                    }else{
                        return <>
                            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                            <button onClick= {onReset}>리셋</button>
                        </>
                    }
                })()
            } */}


            {/* react에서의 조건문은 삼항연산자래 ㄷㄷ */}
            { renderAverage() }
            
        </>
    );
}

export default ResponseCheckHooks;