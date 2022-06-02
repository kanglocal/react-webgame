const React = require('react');
const ReactDom = require('react-dom/client');

// const NumberBaseball = require('./NumberBaseballClass');

// import NumberBaseball from './NumberBaseballClass';
import NumberBaseball from './NumberBaseballHooks';
// import NumberBaseball from './RenderTest';

const rootNode = document.querySelector('#root');

ReactDom.createRoot(rootNode).render(
    <NumberBaseball/>
)