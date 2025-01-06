import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { CartProvider } from './components/sub/CartContext';

/* components */
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import FloatingMenu from "./components/common/FloatingMenu";
/* Pages */
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';

/* css */
import './styles/index.scss';

function App({addToCart}) {

  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/about" element={<AboutPage />}/>
            <Route path="/products" element={<ProductsPage />}/>
            <Route path="/product/:productId" element={<ProductDetailPage addToCart={addToCart} />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <FloatingMenu />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
