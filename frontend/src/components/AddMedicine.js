import React, { useState } from "react";
import axios from "axios";

function AddMedicine({ fetchMedicines }) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/medicines", {
      name,
      dosage,
      time
    });

    setName("");
    setDosage("");
    setTime("");
    fetchMedicines();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Medicine Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Dosage" value={dosage} onChange={e => setDosage(e.target.value)} required />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
      <button>Add</button>
    </form>
  );
}

export default AddMedicine;