// npm에서 설치한 애들 불러오는 것!
const React = require('react');
const { Component } = React;

class WordRelay extends React.Component {
    state = {
        text: 'Hello, webpack',
    };

    render() {
        return <h1>{this.state.text}</h1>;
    }
}

module.exports = WordRelay;// 이 줄을 추가해야 client.jsx 에서 불러올 수 있다.