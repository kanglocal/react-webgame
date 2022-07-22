import React, { Component } from 'react';
import Ball from './Ball';

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

class LottoClass extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [], // winNumbers 의 앞에 6개 숫자가 담긴다.
        bonus: null, // winNumbers 의 마지막 1개 숫자가 담긴다.
        redo: false,
    };

    timeouts = [];

    componentDidMount() {
        const { winNumbers } = this.state;
        for(let i = 0; i < winNumbers.length - 1; i ++){ // let i 로 하면 closer 문제가 생기지 않는다.
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return{
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 500);
        }
        // 보너스 공
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 3500)
    }

    componentWillUnmount(){
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }


    render() {
        const { winBalls, bonus, redo } = this.state;
        return(    
            <>
                <div>당첨 숫자</div>
                {/* 반복문은 자식컴포넌트로 나누는 좋은 기점이 된다. */}
                <div id="resultDiv">
                    { winBalls.map((v) => <Ball key={v} number={v} />) }
                </div>
                <div>보너스!</div>
                { bonus && <Ball number = {bonus} /> }
                <button onClick={ redo ? this.conClickRedo : () => {} }>한 번 더!</button>
            </>
        );
    }
}

export default LottoClass;