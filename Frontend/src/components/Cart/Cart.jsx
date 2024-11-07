import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleRemove = (id) => {
    console.log("Removing item with id:", id); // Debugging
    removeFromCart(id);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleBuyNow = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <div className="cart">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div className="cart-item-details">
                  <img
                    src={item.image} // This should display the correct image
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <span>{item.name}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                </div>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="total">
            <h2>Total: {formatPrice(calculateTotal())}</h2>
          </div>
          <button onClick={handleBuyNow} className="buy-now-button">
            Buy Now
          </button>
        </>
      )}
    </div>
  );
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(price);
};

export default Cart;
