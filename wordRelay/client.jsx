// npm에서 설치한 애들 불러오는 것!
const React = require('react');
// const ReactDom = require('react-dom');
const ReactDom = require('react-dom/client'); // new version 용

// 같은폴더내에서 쪼개놓은 아이 불러오는 것
const WordRelay = require('./WordRelayHooks');

const rootNode = document.querySelector('#root');

// ReactDom.render(<WordRelay />, document.querySelector('#root'));
ReactDom.createRoot(rootNode).render(// new version 용
    <WordRelay/>
)