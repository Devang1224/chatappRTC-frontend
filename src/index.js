import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UsercontextProvider from './contextApi/Usercontext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <UsercontextProvider>
               <App />
      </UsercontextProvider>
  </React.StrictMode>
  
);


