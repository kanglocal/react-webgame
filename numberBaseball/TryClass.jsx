// import React, { Component } from 'react';
import React, { PureComponent } from 'react';

// class Try extends Component {
class Try extends PureComponent {
    constructor(props){
        super(props);

        // constructor 도 함수이기때문에 미세조정 가능.
        // 예를들어

        // const filtered = this.props.filter(() => {
        //     등등
        // })
        // 기본 객체로는 안되는 동작이 있을경우 사용한다.


        this.state = {
            result: this.props.result,
            try: this.props.try,
        }
    }


    // class에서 props state 에 넣기
    state = {
        result: this.props.result,
        try: this.props.try,
    }

    render() {
        // const { tryInfo } = this.props;
        const { tryInfo } = this.props;
        return (
            // props 가 있다 = 부모가 있다!
            <li key = { `${tryInfo.index} 차 시도` }> 
                   <div>{ tryInfo.try }</div>
                   <div>{ tryInfo.result }</div>
            </li>
        );
    }
}

export default Try;
