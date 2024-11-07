import { useEffect, useState } from "react";
import { fetchMedicines } from "../../services/medicineService";
import { useLocation, useNavigate } from "react-router-dom";
import ShopBar from "../ShopBar/ShopBar";
import "./Shop.css";

const Shop = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    const subcategory = query.get("subcategory");

    // Fetch medicines based on category and subcategory
    const getMedicines = async () => {
      try {
        const data = await fetchMedicines(category, subcategory); // Pass category and subcategory
        setMedicines(data);
      } catch (error) {
        setError("Failed to fetch medicines");
      } finally {
        setLoading(false);
      }
    };

    getMedicines();
  }, [location.search]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="shop">
      <ShopBar />
      <h1>Shop Page</h1>
      <div className="medicine-list">
        {medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="medicine-item"
            onClick={() => handleProductClick(medicine._id)}
          >
            <img src={medicine.Image} alt={medicine.Medicine_name} />
            <h2>{medicine.Medicine_name}</h2>
            <p>{formatPrice(medicine.Price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
