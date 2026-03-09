import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import GuestLayout from './components/GuestLayout';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/Admin';
import Preloader from './components/Preloader';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Login />;
};

function AppContent() {
    const [loading, setLoading] = React.useState(true);
    const { isAuthenticated } = useAuth();

    if (loading) {
        return <Preloader onFinish={() => setLoading(false)} />;
    }

    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
                {/* Guest Routes */}
                <Route path="/" element={!isAuthenticated ? <GuestLayout /> : <AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    {/* Static Guest Placeholders */}
                    <Route path="careers" element={<About />} />
                    <Route path="terms" element={<About />} />
                    <Route path="privacy" element={<About />} />
                    <Route path="faq" element={<About />} />
                    <Route path="contact" element={<About />} />
                    <Route path="shipping" element={<About />} />
                    <Route path="returns" element={<About />} />
                </Route>

                {/* Authenticated Routes */}
                <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                    <Route path="shop" element={<Shop />} />
                    <Route path="collections" element={<Collections />} />
                    <Route path="product/:id" element={<ProductDetails />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="admin" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <AppContent />
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
