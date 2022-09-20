import React from 'react';
import ReactDom from 'react-dom/client';
// import { hot } from 'react-hot-loader/root';

import TicTacToe from './TicTacToe.jsx';


// const Hot = hot(rockScissorsPaper);

// ReactDom.render(<Hot />, document.querySelector('#root'));

const rootNode = document.querySelector('#root');

ReactDom.createRoot(rootNode).render(
    <TicTacToe/>
)
