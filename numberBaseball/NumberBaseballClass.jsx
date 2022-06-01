import React, { Component } from 'react';
import Try from './Try';

// 숫자 4개를 겹치지않고 랜덤하게 뽑는 함수
// this 를 안쓰는 함수여서 class 밖에 위치시켰음. 안에 넣어도 된다.
// ( 다른데서 이 함수를 쓸 일이 생길 경우 가져다 쓰기 위해서)
function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4 ; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseballClass extends Component {
    state = {
            result: '',
            value: '',
            answer: getNumbers(),
            tries: [],
    };

    resetGame = () => {
        alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                })
    }

    onSubmitForm = (e) => {
        // const { result, value, answer } = this.state;
        // 위 구문(비구조화할당)을 쓰면, 아래 코드에서 this.state 부분 다 뺄 수 있음.
        e.preventDefault();
        if(this.state.result !== ''){
            this.state.result = '';
        }

        if(this.state.value === this.state.answer.join('')){
            this.setState({
                result: '홈런!',
                tries: [...this.state.tries, { try: this.state.value, result: '홈런!'}]
                // react 에서는 push하면 안됨(state가 바뀌거야 렌더링을 하는데, push하면 바뀌었는지 구분 불가)
                // [...복사할 배열, 추가할 거]
            });
            this.resetGame();

        }else{
            const answerArray = this.state.value.split('').map( (v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9){ // 10번 이상 틀렸을 때
                this.setState( {
                    result : `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')} 였습니다!`
                });
                this.resetGame();
            }else{
                for(let i = 0; i < 4; i += 1){
                    if( answerArray[i] === this.state.answer[i]){
                        strike += 1;
                    } else if( this.state.answer.includes(answerArray[i])){
                        ball += 1;
                    }
                    this.setState({
                        tries: [ ...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                        value: '',
                    });
                }
                
            }
        }

    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        })
    };

    // state가 바뀔때마다 재실행되는 render()
    render() {
        // const { result, value, tries } = this.state;
        // 위 구문(비구조화할당)을 쓰면, 아래 코드에서 this.state 부분 다 뺄 수 있음.

        return (
            <>
                <h1>{ this.state.result }</h1>
                <form onSubmit = { this.onSubmitForm }>
                    <input maxLength = { 4 } value = { this.state.value } onChange = { this.onChangeInput } />
                </form>
                <div>시도: { this.state.tries.length }</div>

                {/* 반복문 사용 방법 2가지. 1) 2차원배열 생성  2) 객체 생성*/}
                <ul>
                    {/* 1) 2차원 배열 생성 */}
                    {/* {[[
                        '사과','Apple'],
                        ['오렌지','Orange'],
                        ['포도','Grape'],
                        ['바나나','Banana'],
                        ['체리','Cherry']
                    ].map( (v) => {
                        return (
                            <li> <b>{ v[0] }</b> - { v[1] } </li>
                        );
                    })} */}

                    {/* 2) 객체 생성 */}
                    {this.state.tries.map( (v, i) => {
                        // return () 은 생략 가능. key에는 i 넣으면 안된다.(성능최적화 문제)
                        return (
                            // 다른파일로 뺀 것. 성능문제, 가독성문제로 다른파일로 뺀 것이다.
                            <Try key={`${i + 1} 차 시도 :`} tryInfo = { v } index = { i } />
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseballClass; // import NumberBaseballClass;