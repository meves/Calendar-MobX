import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss'
import { AppStyles } from './App/AppStylles/AppStyles';

if (!new class { x }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly');

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <BrowserRouter>
        <AppStyles>
            <App /> 
        </AppStyles>
    </BrowserRouter>
)