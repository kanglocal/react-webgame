import React, { Component } from 'react';

class Try extends Component {
    render() {
        // const { tryInfo } = this.props;

        return (
            // props 가 있다 = 부모가 있다!
            <li key = { `${this.props.tryInfo.index} 차 시도` }> 
                   <div>{ this.props.tryInfo.try }</div>
                   <div>{ this.props.tryInfo.result }</div>
            </li>
        )
    }
}

export default Try;
