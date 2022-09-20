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

    runTimeouts = () => {
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
        }, 3500);
    }

    componentDidMount() {
        this.runTimeouts();
    }

    // setState가 실행될 때 마다(state가 변경될 때 마다) 실행됨
    // prevProps = 부모한테 받은 값, prevState 바뀌기 이전의 state 값
    componentDidUpdate(prevProps, prevState){
        // 어떤 state가 바뀌었는지 판단한다.(prevState랑 지금 state의 값을 비교해서)
        // if(this.state.winBalls.length === 0){
        if(this.timeouts.length === 0){
            this.runTimeouts();
        }
    }

    componentWillUnmount(){
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    onClickRedo = () => {
        // 기존 state 초기화
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        });
        this.timeouts = [];
    };

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
                { redo && <button onClick={ this.onClickRedo}>한 번 더!</button>}
            </>
        );
    }
}

export default LottoClass;