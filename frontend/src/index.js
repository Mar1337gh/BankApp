import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); //приложение реакта корень
root.render(  // рендерится приложение / структура, компоненты jsx (зеленые) с большой буквы
  <React.StrictMode>  
    <App /> {/* components */}
  </React.StrictMode>
);
