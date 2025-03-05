import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const [date, setDate] = useState("");
  const [morning, setMorning] = useState(null);
  const [evening, setEvening] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [modCount, setModCount] = useState(0);
  const navigate = useNavigate(); // 👈 Hook for navigation

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/logs");
        const data = await response.json();

        if (data.length > 0) {
          const lastTotalCount = data[0].count;
          setTotalCount(lastTotalCount);
          setModCount(lastTotalCount % 16);
        }
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchCount();
  }, []);

  const handleSubmit = async () => {
    if (!date || morning === null || evening === null) {
      alert("Please fill all fields");
      return;
    }

    const requestBody = { date, morning, evening };

    try {
      const response = await fetch("http://localhost:5000/api/addride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Log added successfully!");
        setDate("");
        setMorning(null);
        setEvening(null);

        const updatedResponse = await fetch("http://localhost:5000/api/logs");
        const updatedData = await updatedResponse.json();
        if (updatedData.length > 0) {
          const lastTotalCount = updatedData[0].count;
          setTotalCount(lastTotalCount);
          setModCount(lastTotalCount % 16);
        }
      } else {
        alert("Failed to add log");
      }
    } catch (error) {
      console.error("Error adding log:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2 className={styles.title}>Add Ride Log</h2>

        <p className={styles.countText}>Total Count: {totalCount}</p>
        <p className={styles.countText}>Ride Count (Mod 16): {modCount}</p>

        <label className={styles.label}>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
        />

        <label className={styles.label}>Morning Ride:</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="morning"
              value="yes"
              checked={morning === "yes"}
              onChange={() => setMorning("yes")}
            />
            Yes
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="morning"
              value="no"
              checked={morning === "no"}
              onChange={() => setMorning("no")}
            />
            No
          </label>
        </div>

        <label className={styles.label}>Evening Ride:</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="evening"
              value="yes"
              checked={evening === "yes"}
              onChange={() => setEvening("yes")}
            />
            Yes
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="evening"
              value="no"
              checked={evening === "no"}
              onChange={() => setEvening("no")}
            />
            No
          </label>
        </div>

        <button onClick={handleSubmit} className={styles.button}>
          Submit
        </button>

        <button className={styles.logsButton} onClick={() => navigate("/logs")}>
          View Logs
        </button>
      </div>
    </div>
  );
}
