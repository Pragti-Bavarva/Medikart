// export const fetchMedicines = async () => {
//   const response = await fetch("http://localhost:5555/allMedicines");
//   if (!response.ok) {
//     throw new Error("Failed to fetch medicines");
//   }
//   return response.json();
// };

// export const fetchMedicineById = async (id) => {
//   const response = await fetch(`http://localhost:5555/medicine/${id}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch medicine details");
//   }
//   return response.json();
// };
export const fetchMedicines = async (category = "", subcategory = "") => {
  let url = `http://localhost:5555/allMedicines?`;

  // Append category and subcategory if they are provided
  if (category) url += `category=${category}`;
  if (subcategory) url += `&subcategory=${subcategory}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch medicines");
  }
  return response.json();
};

export const fetchMedicineById = async (id) => {
  const response = await fetch(`http://localhost:5555/medicine/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch medicine details");
  }
  return response.json();
};
