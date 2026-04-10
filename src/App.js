import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

/* ---------------- MOCK DATA ---------------- */
const donorsData = [
  { id: 1, name: "Arun Kumar", bloodType: "A+", age: 22, phone: "9876543210", location: "Salem" },
  { id: 2, name: "Priya", bloodType: "O+", age: 21, phone: "9123456780", location: "Chennai" },
  { id: 3, name: "Rahul", bloodType: "B+", age: 23, phone: "9012345678", location: "Coimbatore" },
  { id: 4, name: "Sneha", bloodType: "AB+", age: 24, phone: "9000000001", location: "Madurai" },
  { id: 5, name: "Karthik", bloodType: "O-", age: 26, phone: "9000000002", location: "Trichy" }
];

/* ---------------- STYLES ---------------- */
const styles = {
  page: {
    fontFamily: "Segoe UI, sans-serif",
    background: "linear-gradient(120deg,#fff5f5,#ffe3e3)",
    minHeight: "100vh",
    padding: "20px"
  },
  header: {
    textAlign: "center",
    color: "#b30000",
    marginBottom: "10px"
  },
  nav: {
    textAlign: "center",
    marginBottom: "20px"
  },
  navLink: {
    margin: "0 10px",
    textDecoration: "none",
    color: "white",
    background: "#b30000",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "15px"
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  statCard: {
    background: "#b30000",
    color: "white",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center"
  },
  title: {
    color: "#b30000",
    borderBottom: "2px solid #ffd6d6",
    paddingBottom: "5px"
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "6px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  select: {
    width: "100%",
    padding: "8px",
    margin: "6px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    background: "#b30000",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "6px"
  },
  alert: {
    background: "#ff4d4d",
    color: "white",
    padding: "8px",
    borderRadius: "8px",
    margin: "5px 0"
  }
};

/* ---------------- DASHBOARD ---------------- */
function DashboardPage() {
  const stock = {
    "A+": 10, "B+": 8, "O+": 15, "AB+": 5,
    "A-": 3, "B-": 2, "O-": 4, "AB-": 1
  };

  const totalUnits = Object.values(stock).reduce((a, b) => a + b, 0);
  const lowStock = Object.entries(stock).filter(([_, u]) => u <= 3);

  const [form, setForm] = useState({ patient: "", bloodType: "", units: "" });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    // ✅ NEW VALIDATIONS
    if (!form.patient || !form.bloodType || !form.units) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const unitsRequested = parseInt(form.units);

    if (isNaN(unitsRequested) || unitsRequested <= 0) {
      alert("⚠️ Enter valid units");
      return;
    }

    const availableUnits = stock[form.bloodType];

    if (!availableUnits || availableUnits <= 0) {
      alert("❌ The blood is not available");
    } else if (unitsRequested > availableUnits) {
      alert("❌ Required units not available");
    } else {
      alert("✅ Blood Request Submitted");
    }
  };

  return (
    <div>
      <h2 style={styles.title}>📊 Dashboard</h2>

      <div style={styles.grid}>
        <div style={styles.statCard}>
          <h3>Total Donors</h3>
          <h2>{donorsData.length}</h2>
        </div>
        <div style={styles.statCard}>
          <h3>Total Units</h3>
          <h2>{totalUnits}</h2>
        </div>
      </div>

      <div style={{marginTop:"20px", ...styles.card}}>
        <h3>🩸 Blood Availability</h3>
        {Object.entries(stock).map(([type, units]) => (
          <p key={type}><b>{type}</b> : {units} units</p>
        ))}
      </div>

      <div style={{marginTop:"20px", ...styles.card}}>
        <h3>🚨 Low Stock Alerts</h3>
        {lowStock.map(([type]) => (
          <div key={type} style={styles.alert}>Low stock: {type}</div>
        ))}
      </div>

      <div style={{marginTop:"20px", ...styles.card}}>
        <h3>📝 Blood Request Form</h3>
        <form onSubmit={handleSubmit}>
          <input style={styles.input} name="patient" placeholder="Patient Name" onChange={handleChange}/>
          
          <select style={styles.select} name="bloodType" onChange={handleChange}>
            <option value="">Select Blood Type</option>
            <option>A+</option><option>B+</option><option>O+</option>
            <option>AB+</option><option>A-</option><option>B-</option>
            <option>O-</option><option>AB-</option>
          </select>

          <input style={styles.input} name="units" placeholder="Units Required" onChange={handleChange}/>
          
          <button style={styles.button}>Submit Request</button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- DONOR LIST ---------------- */
function DonorListPage() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");

  const filtered = donorsData.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) &&
    (group === "" || d.bloodType === group)
  );

  return (
    <div>
      <h2 style={styles.title}>👥 Donor List</h2>

      <div style={styles.card}>
        <input style={styles.input} placeholder="🔍 Search donor by name" onChange={e => setSearch(e.target.value)}/>
        <select style={styles.select} onChange={e => setGroup(e.target.value)}>
          <option value="">Filter by Blood Group</option>
          <option>A+</option><option>B+</option><option>O+</option>
          <option>AB+</option><option>A-</option><option>B-</option>
          <option>O-</option><option>AB-</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filtered.map(d => (
          <div key={d.id} style={styles.card}>
            <h3>{d.name}</h3>
            <p><b>Blood:</b> {d.bloodType}</p>
            <p><b>Location:</b> {d.location}</p>
            <Link style={styles.button} to={`/donor/${d.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- DONOR DETAILS ---------------- */
function DonorDetailsPage() {
  const { id } = useParams();
  const donor = donorsData.find(d => d.id === parseInt(id));
  if (!donor) return <p>Donor not found</p>;

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🔍 Donor Details</h2>
      <p><b>Name:</b> {donor.name}</p>
      <p><b>Age:</b> {donor.age}</p>
      <p><b>Blood Type:</b> {donor.bloodType}</p>
      <p><b>Phone:</b> {donor.phone}</p>
      <p><b>Location:</b> {donor.location}</p>
    </div>
  );
}

/* ---------------- MAIN APP ---------------- */
function App() {
  return (
    <BrowserRouter>
      <div style={styles.page}>
        <h1 style={styles.header}>🩸 Blood Bank Management System</h1>

        <nav style={styles.nav}>
          <Link style={styles.navLink} to="/">Dashboard</Link>
          <Link style={styles.navLink} to="/donors">Donors</Link>
        </nav>

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/donors" element={<DonorListPage />} />
          <Route path="/donor/:id" element={<DonorDetailsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;