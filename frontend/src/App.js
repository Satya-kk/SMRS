import React, { useEffect, useState } from "react";
import axios from "axios";
import AddMedicine from "./components/AddMedicine";
import MedicineList from "./components/MedicineList";
import "./App.css";

function App() {
  const [medicines, setMedicines] = useState([]);

  const fetchMedicines = async () => {
    const res = await axios.get("http://localhost:5000/medicines");
    setMedicines(res.data);
  };

  useEffect(() => {
    fetchMedicines();
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0,5);

      medicines.forEach(med => {
        if (med.time === currentTime) {
          new Notification(`Take ${med.name}`, {
            body: `Dosage: ${med.dosage}`
          });
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [medicines]);

  return (
    <div className="container">
      <h1>💊 Smart Medicine Reminder</h1>
      <AddMedicine fetchMedicines={fetchMedicines} />
      <MedicineList medicines={medicines} fetchMedicines={fetchMedicines} />
    </div>
  );
}

export default App;