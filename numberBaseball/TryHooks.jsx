import React, { memo } from 'react';
// hooks 의 성능 최적화 = memo. component 를 memo로 감싸준다.

//const Try = ( props ) => {
const Try = memo(( props ) => {
    // props 의 값은 자식이 변경하면 안된다. 부모가 바꾸어야함. *원칙임!
    // 실무에서는 바꿔야할경우가있는데, 이럴경우 props를 state에 넣어준 후 그 state를 변경한다.

    
    // 부모한테받은 props 를 state 로 넣기.
    const [ result, setResult ] = useState(tryInfo.result);

    const onClick = () => {
        setResult('1');
    }
    
    return (
        <li key = { `${props.index} 차 시도` }> 
                   <div>{ props.tryInfo.try }</div>
                   <div>{ props.tryInfo.result }</div>

                   {/* 부모한테 받은 rpops 값 바꾼거 출력 */}
                   <div onClick={onClick}>{ result }</div>

        </li>
    )
});

export default Try;
