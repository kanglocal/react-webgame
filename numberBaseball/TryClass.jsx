// import React, { Component } from 'react';
import React, { PureComponent } from 'react';

// class Try extends Component {
class Try extends PureComponent {
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
