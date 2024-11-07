import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { fetchMedicineById } from "../../services/medicineService";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, cart } = useContext(CartContext);
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getMedicine = async () => {
      try {
        const data = await fetchMedicineById(id);
        setMedicine(data);
      } catch (error) {
        setError("Failed to fetch medicine details");
      } finally {
        setLoading(false);
      }
    };

    getMedicine();
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (token) {
      addToCart({
        id: medicine._id,
        name: medicine.Medicine_name,
        quantity,
        price: medicine.Price,
      });
      alert("Added to cart!");
    } else {
      alert("Please log in to add items to the cart.");
    }
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Instead of adding to the cart, just navigate to checkout with item details
      const checkoutDetails = {
        id: medicine._id,
        name: medicine.Medicine_name,
        quantity,
        price: medicine.Price,
      };
      navigate("/checkout", { state: { checkoutDetails } }); // Passing the selected medicine details to checkout
    } else {
      alert("Please log in to proceed to checkout.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-detail">
      {medicine && (
        <>
          <img src={medicine.Image} alt={medicine.Medicine_name} />
          <h1>{medicine.Medicine_name}</h1>
          <p>Category: {medicine.Category.name}</p>

          {/* Display subcategories */}
          {medicine.Category.subcategory.length > 0 && (
            <p>
              Subcategories:{" "}
              {medicine.Category.subcategory.map((sub) => sub.name).join(", ")}
            </p>
          )}

          <p>Stock: {medicine.Quantity}</p>
          <p>{medicine.Description}</p>
          <p>{formatPrice(medicine.Price)}</p>
          <div className="quantity-container">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min="1"
              onChange={handleQuantityChange}
            />
          </div>
          <div className="buttons-container">
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="buy-now-button">
              Buy Now
            </button>
          </div>
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

export default ProductDetail;
