import React from 'react';

//const Try = ( props ) => {
const Try = ( props ) => {
    return (
        <li key = { `${props.index} 차 시도` }> 
                   <div>{ props.tryInfo.try }</div>
                   <div>{ props.tryInfo.result }</div>
        </li>
    )
}

export default Try;
