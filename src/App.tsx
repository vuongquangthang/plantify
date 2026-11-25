import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Layout } from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import ARExperience from './pages/ARExperience';
import PlantFinder from './pages/PlantFinder';
import PlantCare from './pages/PlantCare';
import BlogPost from './pages/Blog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import AccountPage from './pages/Account';
import AboutPage from './pages/About';
import Contact from './pages/Contact';
import Dev3DPreview from './pages/Dev3DPreview';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <ScrollToTop />
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shop/:slug" element={<ProductDetail />} />
                  <Route path="/ar" element={<ARExperience />} />
                  <Route path="/plant-finder" element={<PlantFinder />} />
                  <Route path="/plant-care" element={<PlantCare />} />
                  <Route path="/plant-care/:slug" element={<BlogPost />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dev-3d" element={<Dev3DPreview />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </Layout>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
