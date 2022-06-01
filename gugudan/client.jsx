const React = require('react');
const ReactDom = require('react-dom');

const Gugudan = require('./Gugudan');

// const root = ReactDom.createRoot(document.querySelector('#root'));
ReactDom.render(<Gugudan />, document.querySelector('#root'));
// root.render(<Gugudan />);