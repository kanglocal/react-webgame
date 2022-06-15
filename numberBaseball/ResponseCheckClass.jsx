import React, { Component } from 'react';

class ResponseCheckClass extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    timeout;
    
    // startTime 은 변하는데 state에 넣지 않는 이유 : rendering이 되면 안되기때문!
    startTime;
    endTime;

    onClickScreen = () => {
        // class 를 사용할 경우, 미리 구조분해를 해두자!
        // 특히 this.props 랑 this.state
        const { state, message, reuslt } = this.state;
        if(state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭',
                })
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000 ) + 2000); //2~3초 랜덤
        } else if(state === 'ready') {
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
            })
        } else if ( state === 'now') { //반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime],
                };
            });
        }
    };

    renderAverage = () => {
        const { result } = this.state; 
        return result.length === 0 
                ? null 
                : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
    }
    render() {
        const {state, message} = this.state;
        return (
            // render 함수의 rutrn 안에는 jsx가 오고, jsx 안에서는 for과 if를 못쓴다.
            // jsx 에서는 아무것도 없다 = null 이다.
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}    
                >
                    {message}
                </div>
                {/* react에서의 조건문은 삼항연산자래 ㄷㄷ */}
                { this.renderAverage() }
                
            </>
        )
    }
}

export default ResponseCheckClass;