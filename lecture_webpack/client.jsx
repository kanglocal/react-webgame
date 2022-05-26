// npm에서 설치한 애들 불러오는 것!
const React = require('react');
const ReactDom = require('react-dom');

// 같은폴더내에서 쪼개놓은 아이 불러오는 것
const WordRelay = require('./WordRelay');

ReactDom.render(<WordRelay />, document.querySelector('#root'));