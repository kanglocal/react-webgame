// 제일 마지막에있는 자식 컴포는트는 pureComponent로 해도 된다. 데이터를 담고있기보다는 화면역할만 하기때문에.
import React, { memo } from 'react';

// 이 형태는 Hooks가 아님. 함수형 컴포넌트이다.
// 컴포넌트를 다른 컴포넌트로 감싸는 것 = 하이오더 컴포넌트(=hoc). (여기서는 Ball 컴포넌트를 memo컴포넌트로 감싼건듯)
const Ball = memo(({ number }) => {
    let background;
    if(number <= 10) {
        background = '#FAEACF';
    } else if (number <= 20) {
        background = '#DFB2BFe';
    } else if (number <= 30) {
        background = '#C2BFF5';
    } else if (number <= 40) {
        background = '#A2DECE';
    } else{
        background = '#F2FFBA';
    }
    return (
        <div className="ball" style={{ background }}>{ number }</div>
    );    
})


export default Ball;