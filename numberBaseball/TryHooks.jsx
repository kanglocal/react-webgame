import React, { memo } from 'react';
// hooks 의 성능 최적화 = memo. component 를 memo로 감싸준다.

//const Try = ( props ) => {
const Try = memo(( props ) => {
    return (
        <li key = { `${props.index} 차 시도` }> 
                   <div>{ props.tryInfo.try }</div>
                   <div>{ props.tryInfo.result }</div>
        </li>
    )
});

export default Try;
