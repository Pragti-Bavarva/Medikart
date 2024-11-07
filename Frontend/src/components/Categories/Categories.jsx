import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categories.css";

const categoriesData = {
  "Baby Needs": [
    // "Baby Diapers",
    // "Baby Oil and Lotions",
    // "Baby Soap and Shampoo",
    // "Baby Nutrition",
  ],
  "Personal Care": [
    // "Skin Care",
    // "Oral Care",
    // "Bath And Body Products",
    // "Shaving Products",
  ],
  Nutrition: [
    // "Nutritional Foods", "Nutritional Powders", "Natural Nutrition"
  ],
  OTC: [
    // "First Aid Kits",
    // "Pain Relief",
    // "Viral",
    // "Joint Pain",
    // "Digestive Laxatives",
    // "Anti Smoking Products",
  ],
  "Health Care Devices": [
    // "BP Weight Monitoring",
    // "Thermometers",
    // "Vaporizers",
    // "Pulse Oximeters",
    // "Oxygen Concentrators",
  ],
  "Vitamins and Supplements": [
    // "Sports Supplements",
    // "Vitamins & Minerals",
    // "Herbal Supplements",
  ],
  Diabetes: [
    // "Diabetic Testing Needs",
    // "Insulin Needles Devices",
    // "Diabetic Nutrition",
  ],
  Ayurvedic: [
    // "Ayurvedic Personal Care",
    // "Ayurvedic Foods",
    // "Herbal Supplements",
    // "Immunity Boosters",
  ],
};

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (category) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  const handleSubcategoryClick = (category, subcategory) => {
    // Navigate to Shop with category and subcategory as query parameters
    navigate(`/shop?category=${category}&subcategory=${subcategory}`);
  };

  return (
    <div className="categories-menu">
      {Object.keys(categoriesData).map((category) => (
        <div
          className="category-item"
          key={category}
          onMouseEnter={() => handleMouseEnter(category)}
          onMouseLeave={handleMouseLeave}
        >
          {category}
          {activeCategory === category && (
            <div className="subcategory-dropdown">
              {categoriesData[category].map((subcategory) => (
                <div
                  className="subcategory-item"
                  key={subcategory}
                  onClick={() => handleSubcategoryClick(category, subcategory)}
                >
                  {subcategory}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categories;
