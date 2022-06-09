import React, { Component } from 'react';

class ResponseCheckClass extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    onClickScreen = () => {

    }

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