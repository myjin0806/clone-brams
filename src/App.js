import { useState } from "react"
import { BrowserRouter, Routes, Route  } from "react-router-dom"
import { CartProvider } from './components/sub/CartContext'
import { CategoryProvider } from './components/common/CategoryContext';

/* components */
import Header from "./components/common/Header"
import Footer from "./components/common/Footer"
import FloatingMenu from "./components/common/FloatingMenu"
/* Pages */
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import RentalProductsPage from "./pages/RentalProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import ExperienceStoresPage from "./pages/ExperienceStoresPage"
import AboutPage from "./pages/AboutPage"
import BrandStoryPage from "./pages/BrandStoryPage"
import CertificationPage from "./pages/CertificationPage"
import AnnouncementsPage from './pages/AnnouncementsPage'
import NewsPage from './pages/NewsPage.jsx'
import ReviewsPage from './pages/ReviewsPage'
import ManualPage from "./pages/ManualPage.jsx";
import WithBramsPage from "./pages/WithBramsPage.jsx";

import LoginPage from "./pages/LoginPage"
import NotFoundPage from './pages/NotFoundPage'
import CartPage from './pages/CartPage'

/* scss */
import './styles/index.scss';


function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <CartProvider>
      <CategoryProvider>
        <BrowserRouter>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/products" element={<ProductsPage />}/>
              <Route path="/rental" element={<RentalProductsPage />}/>
              <Route path="/product/:productId" element={<ProductDetailPage addToCart={addToCart} />}/>
              <Route path="/experiencestores" element={<ExperienceStoresPage />}/>
              <Route path="/about" element={<AboutPage />}/>  
              <Route path="/brandstory" element={<BrandStoryPage />}/>
              <Route path="/certification" element={<CertificationPage />}/>
              <Route path="/announcements" element={<AnnouncementsPage/>}/>
              <Route path="/news" element={<NewsPage/>}/>
              <Route path="/manual" element={<ManualPage/>}/>
              <Route path="/withbrams" element={<WithBramsPage/>}/>

              <Route path="/reviews" element={<ReviewsPage/>}/>
              <Route path="/product/:999" element={<ProductDetailPage addToCart={addToCart} />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/cart" element={<CartPage cart={cart} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <FloatingMenu />
          <Footer />
        </BrowserRouter>
      </CategoryProvider>
    </CartProvider>
  );
}

export default App;
