import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss'
import { AppProvider } from './App/AppProvider';
import { MantineProvider } from '@mantine/core';

if (!new class { x }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly');

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(    
    <AppProvider>
        <BrowserRouter>
            <MantineProvider
                withGlobalStyles withNormalizeCSS
                theme={{
                    fontFamily: 'Roboto, sans-serif'
                }}
            >
                <App /> 
            </MantineProvider>
        </BrowserRouter>
    </AppProvider>    
);