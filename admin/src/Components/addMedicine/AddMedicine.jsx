import React, { useState } from "react";
import "./AddMedicine.css";

const AddMedicine = () => {
  const [medicineDetails, setMedicineDetails] = useState({
    Medicine_name: "",
    id: "",
    Quantity: "",
    Price: "",
    Description: "",
    Image: "",
    Category: "",
    Subcategory: "",
  });

  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = {
    "Baby Needs": [
      "Baby Diapers",
      "Baby Oil and Lotions",
      "Baby Soap and Shampoo",
      "Baby Nutrition",
    ],
    "Personal Care": [
      "Skin Care",
      "Oral Care",
      "Bath And Body Products",
      "Shaving Products",
    ],
    Nutrition: [
      "Nutritional Foods",
      "Nutritional Powders",
      "Natural Nutrition",
    ],
    OTC: [
      "First Aid Kits",
      "Pain Relief",
      "Viral",
      "Joint Pain",
      "Digestive Laxatives",
      "Anti Smoking Products",
    ],
    "Health Care Devices": [
      "BP Weight Monitoring",
      "Thermometers",
      "Vaporizers",
      "Pulse Oximeters",
      "Oxygen Concentrators",
    ],
    "Vitamins and Supplements": [
      "Sports Supplements",
      "Vitamins & Minerals",
      "Herbal Supplements",
    ],
    Diabetes: [
      "Diabetic Testing Needs",
      "Insulin Needles Devices",
      "Diabetic Nutrition",
    ],
    Ayurvedic: [
      "Ayurvedic Personal Care",
      "Ayurvedic Foods",
      "Herbal Supplements",
      "Immunity Boosters",
    ],
  };

  const changeHandler = (e) => {
    setMedicineDetails({
      ...medicineDetails,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (e) => {
    setMedicineDetails({ ...medicineDetails, Image: e.target.files[0] });
    setImage(e.target.files[0]);
  };

  const addMedicine = async () => {
    let responseData;
    let formData = new FormData();
    formData.append("image", image);

    await fetch("http://localhost:5555/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      let medicine = {
        ...medicineDetails,
        Image: responseData.image_url,
        Category: {
          name: medicineDetails.Category,
          subcategory: [medicineDetails.Subcategory],
        },
      };

      await fetch("http://localhost:5555/addMedicine", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicine),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Medicine Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="addMedicine">
      <div className="addMedicine-itemfield">
        <p>Medicine Name</p>
        <input
          type="text"
          name="Medicine_name"
          value={medicineDetails.Medicine_name}
          onChange={changeHandler}
          placeholder="Please type here"
        />
      </div>
      <div className="addMedicine-itemfield">
        <p>Medicine ID</p>
        <input
          type="text"
          name="id"
          value={medicineDetails.id}
          onChange={changeHandler}
          placeholder="Please type here"
        />
      </div>
      <div className="addMedicine-itemfield">
        <p>Quantity</p>
        <input
          type="number"
          name="Quantity"
          value={medicineDetails.Quantity}
          onChange={changeHandler}
          placeholder="Please type here"
        />
      </div>
      <div className="addMedicine-itemfield">
        <p>Price</p>
        <input
          type="number"
          name="Price"
          value={medicineDetails.Price}
          onChange={changeHandler}
          placeholder="Please type here"
        />
      </div>
      <div className="addMedicine-itemfield">
        <p>Description</p>
        <textarea
          name="Description"
          value={medicineDetails.Description}
          onChange={changeHandler}
          placeholder="Please type here"
        />
      </div>
      <div className="addMedicine-itemfield">
        <p>Medicine Image</p>
        <input type="file" name="Image" onChange={imageHandler} />
      </div>
      <div className="addMedicine-itemfield">
        <p>Category</p>
        <select
          name="Category"
          value={medicineDetails.Category}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            changeHandler(e);
          }}
        >
          <option value="">Select a category</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="addMedicine-itemfield">
        <p>Subcategory</p>
        <select
          name="Subcategory"
          value={medicineDetails.Subcategory}
          onChange={changeHandler}
        >
          <option value="">Select a subcategory</option>
          {selectedCategory &&
            categories[selectedCategory].map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>
      </div>
      <div className="addMedicine-button">
        <button onClick={addMedicine}>Add Medicine</button>
      </div>
    </div>
  );
};

export default AddMedicine;
