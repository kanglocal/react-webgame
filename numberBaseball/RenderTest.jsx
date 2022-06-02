import React, { Component } from 'react';

class Test extends Component {
    state = {
        counter: 0,
    }

    // 어떤경우에 렌더링 시킬것인지 적어주는 곳. 최적화를 꼭 해야한다. devTool 보면서!!
    // devTool의 어디를 봐야하냐면, reactComponent 탭에서 톱니바퀴 누르고, Highlight updates when components render에 체크하면된다.
    // 이거 쓰는게 불편하다하면 편한 방법이 있다. >> pureComponent
    // pureComponent : shouldComponenetUpdate 를 자동으로 구현해놓은 것.
    // pureComponent는 객체나 배열 등 참조관계가있는것들은 사용이 얿다.
    shouldComponentUpdate(nextProps, nextState, nextContext){
        if(this.state.counter !== nextState.counter){
            return true; // 렌더링해라.
        }
        return false; // 렌더링 하지마라.
    }

    onClick = () => {
        this.setState({});// 값이 바뀌지 않고있는 상황. 렌더링이 될까?
        // 렌더링이 다시 일어난다. setState를 호출할 때 렌더링이 됨.
        
    };

    render() {
        console.log('렌더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        )
    }
}

export default Test;