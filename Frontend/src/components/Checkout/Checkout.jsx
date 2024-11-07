import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("home");

  // Extract checkout details from state passed during navigation
  const checkoutDetails = location.state?.checkoutDetails;

  // Log checkout details for debugging
  console.log("Checkout Details:", checkoutDetails);

  const calculateTotal = () => {
    let total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    if (checkoutDetails) {
      total += checkoutDetails.price * checkoutDetails.quantity; // Add the selected item price
    }
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkoutData = {
      name,
      phone,
      email,
      address,
      addressType,
      totalAmount: calculateTotal(),
    };

    console.log("Checkout Data:", checkoutData);
    alert("Checkout successful!");
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Shipping Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address Type:</label>
          <select
            value={addressType}
            onChange={(e) => setAddressType(e.target.value)}
          >
            <option value="home">Home</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div className="total-amount">
          <h2>Total Amount: {formatPrice(calculateTotal())}</h2>
        </div>
        <button type="submit" className="checkout-button">
          Submit
        </button>
      </form>
    </div>
  );
};

// Function to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(price);
};

export default Checkout;
