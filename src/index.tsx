import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const a = '3';

console.log(a as string);

console.log(
  '------------------------매우긴 문장 입니다 ------------------------------------------'
);

const test = a => console.log(a);
console.log(test);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
