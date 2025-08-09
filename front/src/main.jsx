// src/main.jsx
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Importa el BrowserRouter aquí
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import store from './redux/store.js';
import './i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* Envuelve tu App con BrowserRouter aquí */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);