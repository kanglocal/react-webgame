// npm에서 설치한 애들 불러오는 것!
const React = require('react');
const { Component } = React;

class WordRelay extends React.Component {
    state = {
        word: '강현지',
        value: '',
        result: '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                result: '딩동댕',
                word: this.state.value,
                value: '',
            });
            this.input.focus();
        }else{
            this.setState({
                result: '땡',
                value: '',
            })
            this.input.focus();
        }
    }

    onChangeInput = (e) => {
        this.setState({ value: e.currentTarget.value });
        // currentTarget : 이벤트 생성 위치
        // target :  이벤트 발생 위치
    };

    input;

    onRefInput = (c) => {
        this.input = c;
    }

    

    render() {
        return (
            <>
                <div>{ this.state.word }</div>
                <form onSubmit= { this.onSubmitForm }>
                    <input ref= { this.onRefInput } value= { this.state.value } onChange= { this.onChangeInput }/>
                    {/* value 와 onChange 세트로 넣을거 아니면 defaultValue 를 사용해야한다. */}
                    <button>입력!123</button>
                </form>
                <div>{ this.state.result }</div>
            </>
        )
    }
}

module.exports = WordRelay;// 이 줄을 추가해야 client.jsx 에서 불러올 수 있다.