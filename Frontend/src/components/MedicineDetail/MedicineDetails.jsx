import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMedicineById } from "../../services/medicineService";
import "./MedicineDetails.css";

const MedicineDetails = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!medicine) return <p>Medicine not found</p>;

  return (
    <div className="medicine-container">
      <div className="medicine-image">
        <img src={medicine.Image} alt={medicine.Medicine_name} />
        <div className="image-overlay"></div>
      </div>
      <div className="medicine-info">
        <h2 className="medicine-name">{medicine.Medicine_name}</h2>
        <p className="medicine-description">{medicine.Description}</p>
        <p className="medicine-price">Price: {formatPrice(medicine.Price)}</p>

        <div className="button-container">
          {medicine.Categories.map((category) => (
            <button key={category} className="medicine-category btn-category">
              {category}
            </button>
          ))}
        </div>

        <div className="quantity-controls">
          <button className="quantity-button" onClick={() => updateQuantity(-1)}>-</button>
          <span className="quantity-value" id="quantity">1</span>
          <button className="quantity-button" onClick={() => updateQuantity(1)}>+</button>
        </div>

        <div className="action-buttons">
          <button className="btn add-to-cart">Add to Cart</button>
          <button className="btn buy-now">Buy Now</button>
        </div>
      </div>
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

const updateQuantity = (change) => {
  let quantityElement = document.getElementById('quantity');
  let currentQuantity = parseInt(quantityElement.innerText);
  let newQuantity = currentQuantity + change;

  if (newQuantity < 1) {
    newQuantity = 1;
  }

  quantityElement.innerText = newQuantity;
};

export default MedicineDetails;
