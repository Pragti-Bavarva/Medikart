// import React, { useState, useEffect } from "react";
// import "./ListMedicine.css";
// import cross_icon from "../../assets/cross_icon.png";

// const ListMedicine = () => {
//   const [allMedicines, setAllMedicines] = useState([]);

//   const fetchInfo = async () => {
//     await fetch("http://localhost:5555/allMedicines")
//       .then((res) => res.json())
//       .then((data) => {
//         setAllMedicines(data);
//       });
//   };

//   useEffect(() => {
//     fetchInfo();
//   }, []);

//   const remove_Medicine = async (id) => {
//     await fetch(`http://localhost:5555/removeMedicine`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id: id }),
//     });
//     await fetchInfo();
//   };

//   return (
//     <div className="listMedicine">
//       <h1>Medicines List</h1>
//       {/* Add medicines list */}
//       <div className="listMedicine-format-main">
//         <p>Medicines</p>
//         <p>Name</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Category</p>
//         {/* <p>Subcategory</p> */}
//         <p>Remove</p>
//       </div>
//       <div className="listMedicine-allMedicine">
//         <hr />
//         {allMedicines.map((Medicine, index) => {
//           return (
//             <>
//               <div
//                 key={index}
//                 className="listMedicine-format-main listMedicine-format"
//               >
//                 <img
//                   src={Medicine.Image}
//                   alt=""
//                   className="listMedicine-Medicine-icon"
//                 />
//                 <p>{Medicine.Medicine_name}</p>
//                 <p>${Medicine.Price}</p>
//                 <p>${Medicine.Quantity}</p>
//                 <p>{Medicine.Category.name}</p>

//                 <img
//                   onClick={() => remove_Medicine(Medicine.id)}
//                   className="listMedicine-remove-icon"
//                   src={cross_icon}
//                   alt=""
//                 />
//               </div>
//               <hr />
//             </>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ListMedicine;

import React, { useState, useEffect } from "react";
import "./ListMedicine.css";
import cross_icon from "../../assets/cross_icon.png";

const ListMedicine = () => {
  const [allMedicines, setAllMedicines] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:5555/allMedicines")
      .then((res) => res.json())
      .then((data) => {
        setAllMedicines(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_Medicine = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this medicine?"
    );
    if (confirmed) {
      await fetch(`http://localhost:5555/removeMedicine`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      await fetchInfo();
    }
  };

  return (
    <div className="listMedicine">
      <h1>Medicines List</h1>
      {/* Add medicines list */}
      <div className="listMedicine-format-main">
        <p>Medicines</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Category</p>
        {/* <p>Subcategory</p> */}
        <p>Remove</p>
      </div>
      <div className="listMedicine-allMedicine">
        <hr />
        {allMedicines.map((Medicine, index) => {
          return (
            <React.Fragment key={index}>
              <div className="listMedicine-format-main listMedicine-format">
                <img
                  src={Medicine.Image}
                  alt=""
                  className="listMedicine-Medicine-icon"
                />
                <p>{Medicine.Medicine_name}</p>
                <p>₹{Medicine.Price}</p>
                <p>{Medicine.Quantity}</p>
                <p>{Medicine.Category.name}</p>
                <img
                  onClick={() => remove_Medicine(Medicine.id)}
                  className="listMedicine-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ListMedicine;
