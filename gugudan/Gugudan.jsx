const React = require('react');
const { Component } = React;
const{ useState, useRef } = React;

const Gugudan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);// :: null자리는 초기값 넣는 자리.

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second) {
            setResult((prevResult) => {
                return '정답: ' + value
            });
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            inputRef.current.focus();// :: 돔에 접근할때에는 current 를 써줘야한다.
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };
    console.log('렌더링');
    // :: html 을 return시 주의점
    // :: class 못 씀.( 컴포넌트클래스와 html속성 class구분불가로, className을 사용)
    // :: onclick, onsubmit 같은것 onClick,onSubmit 으로 카멜표기법으로 작성.
    // :: (카멜표기법으로 작성하는것은 react여서가 아니고 자바스크립트로 리턴할때는 이래야하는것인가봄.)
    // :: label에 쓰이는 for 은 htmlFor 로 써야한다.

    return (
        <>
            <div>{first} 곱하기 {second} 는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value}/>
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = Gugudan;