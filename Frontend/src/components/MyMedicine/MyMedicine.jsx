import React, { useEffect, useState } from "react";
import { fetchMedicines } from "../../services/medicineService";
import { useNavigate } from "react-router-dom";
import "./MyMedicine.css";

const MyMedicine = () => {
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedListIndex, setSelectedListIndex] = useState(null);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getMedicines = async () => {
      try {
        const data = await fetchMedicines();
        setMedicines(data);
      } catch (error) {
        setError("Failed to fetch medicines");
      } finally {
        setLoading(false);
      }
    };

    getMedicines();
  }, []);

  const handleCreateList = () => {
    if (listName) {
      setLists([...lists, { name: listName, medicines: [] }]);
      setListName("");
    }
  };

  const handleAddMedicine = (listIndex, medicine) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].medicines.push(medicine);
    setLists(updatedLists);
  };

  const handleRemoveMedicine = (listIndex, medicineIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].medicines.splice(medicineIndex, 1);
    setLists(updatedLists);
  };

  const openMedicineModal = (index) => {
    setSelectedListIndex(index);
    setShowMedicineModal(true);
  };

  const closeMedicineModal = () => {
    setShowMedicineModal(false);
  };

  const handleBuyNow = (index) => {
    const selectedList = lists[index];
    navigate("/checkout", { state: { list: selectedList } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-medicine">
      <h1>Create Your List</h1>
      <div className="create-list">
        <input
          type="text"
          placeholder="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button onClick={handleCreateList}>Create List</button>
      </div>
      <div className="lists">
        {lists.map((list, index) => (
          <div key={index} className="list">
            <h2>{list.name}</h2>
            <button onClick={() => openMedicineModal(index)}>
              Add Medicines
            </button>
            <div className="medicine-card-container">
  {list.medicines.map((med, medIndex) => (
    <div key={medIndex} className="medicine-card">
      <img
        src={med.Image}
        alt={med.Medicine_name}
        className="medicine-image"
      />
      <span className="medicine-name">{med.Medicine_name}</span>
      <button onClick={() => handleRemoveMedicine(index, medIndex)}>
        Remove
      </button>
    </div>
  ))}
</div>



            <button onClick={() => handleBuyNow(index)}>Buy Now</button>
          </div>
        ))}
      </div>
      {showMedicineModal && (
        <div className="medicine-modal">
          <h2>Select Medicines to Add</h2>
          <div className="medicine-list">
            {medicines.map((medicine) => (
              <div key={medicine._id} className="medicine-item">
                <img src={medicine.Image} alt={medicine.Medicine_name} />
                <h3>{medicine.Medicine_name}</h3>
                <button
                  onClick={() => {
                    if (selectedListIndex !== null) {
                      handleAddMedicine(selectedListIndex, medicine);
                      closeMedicineModal();
                    }
                  }}
                >
                  Add to List
                </button>
              </div>
            ))}
          </div>
          <button onClick={closeMedicineModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default MyMedicine;
