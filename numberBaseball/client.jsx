const React = require('react');
const ReactDom = require('react-dom/client');
// import { hot } from 'react-hot-loader/root';

// const NumberBaseball = require('./NumberBaseballClass');

// import NumberBaseball from './NumberBaseballClass';
import NumberBaseball from './NumberBaseballHooks';


const rootNode = document.querySelector('#root');

ReactDom.createRoot(rootNode).render(
    <NumberBaseball/>
)
