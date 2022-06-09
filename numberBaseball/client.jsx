const React = require('react');
const ReactDom = require('react-dom/client');
// import { hot } from 'react-hot-loader/root';

// const NumberBaseball = require('./NumberBaseballClass');

// import NumberBaseball from './NumberBaseballClass';
// import NumberBaseball from './NumberBaseballHooks';
// import NumberBaseball from './RenderTest';
import ResponseCheckClass from './ResponseCheckClass';

// const Hot = hot(ResponseCheckClass);

// ReactDom.render(<ResponseCheckClass />, document.querySelector('#root'));

const rootNode = document.querySelector('#root');

ReactDom.createRoot(rootNode).render(
    <ResponseCheckClass/>
)
