import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ProductContextProvider } from './context/ProductContext.jsx';
import { CartContextProvider } from './context/CartContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <CartContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
    <ToastContainer />
  </BrowserRouter>
);
