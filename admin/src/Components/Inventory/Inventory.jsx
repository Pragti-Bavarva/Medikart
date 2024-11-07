import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Category dropdown state
  const [subcategories, setSubcategories] = useState([]); // Subcategories state
  const [message, setMessage] = useState(""); // New state to handle "0 medicines" message

  // List of categories
  const categories = [
    "Personal Care",
    "Nutrition",
    "OTC",
    "Health Care Devices",
    "Vitamins and Supplements",
    "Diabetes",
    "Ayurvedic",
  ];

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:5555/inventory");
      if (response.data.success) {
        setInventory(response.data.inventory);
      } else {
        setError("No inventory data found");
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching inventory data");
      setLoading(false);
    }
  };

  // Fetch subcategories when a category is selected
  const fetchSubcategories = async (category) => {
    setSubcategories([]); // Reset subcategories when a new category is selected
    setMessage(""); // Reset message

    try {
      const response = await axios.get(
        `http://localhost:5555/inventory/subcategories?category=${encodeURIComponent(
          category
        )}`
      );
      if (response.data.success) {
        const subcategoriesData = response.data.subcategories;

        // Check if all subcategories have 0 medicines
        const hasMedicines = subcategoriesData.some(
          (subcat) => subcat.totalQuantity > 0
        );

        if (!hasMedicines) {
          setMessage(`This category has 0 medicines`);
        } else {
          setSubcategories(subcategoriesData);
        }
      } else {
        setMessage("No subcategories found for the selected category");
      }
    } catch (err) {
      setError("Error fetching subcategories");
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchSubcategories(category);
  };

  if (loading) return <p>Loading inventory...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dropdown for categories */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <label>Select Category: </label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">--Select a Category--</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Display Subcategories and their medicine count */}
      {message ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>{message}</p>
      ) : (
        subcategories.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h3>Subcategories of {selectedCategory}</h3>
            <table>
              <thead>
                <tr>
                  <th>Subcategory</th>
                  <th>Total Quantity</th>
                </tr>
              </thead>
              <tbody>
                {subcategories.map((subcat, index) => (
                  <tr key={index}>
                    <td>{subcat.subcategory}</td>
                    <td>{subcat.totalQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default Inventory;
