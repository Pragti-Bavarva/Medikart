import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Checkout from "./components/Checkout/Checkout";

import "./App.css";

// Lazy load components
const Shop = React.lazy(() => import("./components/Shop/Shop"));
const ProductDetail = React.lazy(() =>
  import("./components/ProductDetail/ProductDetail")
);
const Cart = React.lazy(() => import("./components/Cart/Cart"));
const MyMedicine = React.lazy(() =>
  import("./components/MyMedicine/MyMedicine")
);
const Login = React.lazy(() => import("./components/Login/Login"));
const Register = React.lazy(() => import("./components/Registration/Register"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const ProtectedRoute = React.lazy(() =>
  import("./components/ProtectedRoute/ProtectedRoute")
);

// Import your Homepage component
const Homepage = React.lazy(() => import("./components/HomePage/HomePage"));

const AboutUs = () => <h1>About Us Page</h1>;


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/shop/:category/:subcategory" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route
                path="/MyMedicine"
                element={<ProtectedRoute element={<MyMedicine />} />}
              />
              <Route
                path="/profile"
                element={<ProtectedRoute element={<Profile />} />}
              />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </React.Suspense>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
