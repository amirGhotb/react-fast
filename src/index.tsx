import React from 'react';
import ReactDOM from 'react-dom/client';
import './Assets/Sass/app.scss'
import ToastProvider from "./Core/Components/Toast";
import Routes from "./Core/Routes";
import {AppProvider} from "./Core/Storage/AppContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AppProvider>
            <ToastProvider>
                <Routes/>
            </ToastProvider>
        </AppProvider>
    </React.StrictMode>
);
