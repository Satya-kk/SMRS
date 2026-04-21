const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "medicines.json";

// Read medicines
app.get("/medicines", (req, res) => {
    const data = fs.readFileSync(FILE);
    res.json(JSON.parse(data));
});

// Add medicine
app.post("/medicines", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    const newMedicine = { id: Date.now(), ...req.body };
    data.push(newMedicine);
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.json(newMedicine);
});

// Delete medicine
app.delete("/medicines/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    data = data.filter(m => m.id != req.params.id);
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));