import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './index.css';
import Root from './Root.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
        <RecoilRoot>
            <Root />
        </RecoilRoot>
);
