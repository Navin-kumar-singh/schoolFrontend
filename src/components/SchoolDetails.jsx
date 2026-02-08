import React, { useEffect, useState } from "react";

const SchoolDetails = () => {
  const [data, setData] = useState(null);

  const udise = "070502ND201"; // later you can make dynamic

  useEffect(() => {
    // fetch(`http://localhost:9000/api/schools/${udise}`)

       fetch(` https://schoolbackendudise-u4nx.onrender.com/${udise}`)
   
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      {/* MAIN SCHOOL */}
      <div style={styles.mainCard}>
        <h2 style={{ marginBottom: "10px" }}>🏫 Main School</h2>
        <p><b>Name:</b> {data.school.school_name}</p>
        <p><b>UDISE:</b> {data.school.udise_code}</p>
        <p><b>Pincode:</b> {data.school.pincode}</p>

        <a
          href={data.school.location_url}
          target="_blank"
          rel="noreferrer"
          style={styles.mapBtn}
        >
          📍 Open Location
        </a>
      </div>

      {/* NEARBY */}
      <h2 style={{ margin: "20px 0" }}>📌 Nearby Schools</h2>

      <div style={styles.list}>
        {data.nearby.map((item, index) => (
          <div key={index} style={styles.card}>
            <h4>{item.school_name}</h4>

            <p><b>UDISE:</b> {item.udise_code}</p>
            <p><b>Pincode:</b> {item.pincode}</p>
            <p><b>Distance:</b> {item.distance_km} km</p>

            {item.preferred === "yes" && (
              <span style={styles.badge}>⭐ Preferred</span>
            )}

            <br />

            <a
              href={item.location_url}
              target="_blank"
              rel="noreferrer"
              style={styles.mapBtn}
            >
              📍 View on Map
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolDetails;

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },
  mainCard: {
    padding: "15px",
    borderRadius: "10px",
    background: "#e3f2fd",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "15px",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  badge: {
    background: "green",
    color: "white",
    padding: "4px 8px",
    borderRadius: "5px",
    fontSize: "12px",
  },
  mapBtn: {
    display: "inline-block",
    marginTop: "8px",
    padding: "6px 10px",
    background: "#1976d2",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
  },
};
