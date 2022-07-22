import React from 'react';
import ReactDom from 'react-dom/client';
// import { hot } from 'react-hot-loader/root';

import LottoClass from './LottoClass';
import LottoHooks from './LottoHooks';

// const Hot = hot(rockScissorsPaper);

// ReactDom.render(<Hot />, document.querySelector('#root'));

const rootNode = document.querySelector('#root');

ReactDom.createRoot(rootNode).render(
    <LottoClass/>
)
