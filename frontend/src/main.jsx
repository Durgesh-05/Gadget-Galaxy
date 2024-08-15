import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ProductContextProvider } from './context/ProductContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
    <ToastContainer />
  </BrowserRouter>
);
