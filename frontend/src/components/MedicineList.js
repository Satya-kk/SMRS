import React from "react";
import axios from "axios";

function MedicineList({ medicines, fetchMedicines }) {

  const deleteMedicine = async (id) => {
    await axios.delete(`http://localhost:5000/medicines/${id}`);
    fetchMedicines();
  };

  return (
    <div>
      {medicines.map(med => (
        <div key={med.id} className="card">
          <h3>{med.name}</h3>
          <p>Dosage: {med.dosage}</p>
          <p>Time: {med.time}</p>
          <button onClick={() => deleteMedicine(med.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MedicineList;