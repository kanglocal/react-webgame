const React = require('react');
const ReactDom = require('react-dom/client');
// import { hot } from 'react-hot-loader/root';

// import NumberBaseball from './RenderTest';
// import ResponseCheckClass from './ResponseCheckClass';
import ResponseCheckClass from './ResponseCheckHooks';

// const Hot = hot(ResponseCheckClass);

// ReactDom.render(<ResponseCheckClass />, document.querySelector('#root'));

const rootNode = document.querySelector('#root');

ReactDom.createRoot(rootNode).render(
    <ResponseCheckClass/>
)
