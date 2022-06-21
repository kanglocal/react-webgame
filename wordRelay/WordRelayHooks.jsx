// npm에서 설치한 애들 불러오는 것!
const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('강현지');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length - 1] === value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
            
            inputRef.current.focus();
        }else{
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    }

    const onChangeInput = (e) => {
        setValue(e.currentTarget.value);
        // currentTarget : 이벤트 생성 위치
        // target :  이벤트 발생 위치
    };

    
    return (
        <>
            <div>{ word }</div>
            <form onSubmit= { onSubmitForm }>
                <label htmlFor="wordInput">글자를 입력하세요</label>
                {/* controlled Input : value 와 onChange 가 있는거. */}
                {/* uncontrolled Input 은 이런거 없는것. react에서는 controlled Input을 권장 */}
                
                <input 
                    id="wordInput" 
                    className="wordInput" 
                    ref= { inputRef } 
                    value= { value } 
                    onChange= { onChangeInput }/>
                {/* value 와 onChange 세트로 넣을거 아니면 defaultValue 를 사용해야한다. */}
                <button>입력!!!!!!!!!!!!!!</button>
            </form>
            <div>{ result }</div>
        </>
    )
    
}


module.exports = WordRelay;// 이 줄을 추가해야 client.jsx 에서 불러올 수 있다.