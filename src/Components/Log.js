import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Log.module.css";

export default function Log() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/logs");
        const data = await response.json();

        if (data.length > 0) {
          const recentLogs = data.slice(0, 16); // Get the last 16 entries
          setLogs(recentLogs);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        ⬅ Back
      </button>

      <h2 className={styles.title}>Last 16 Ride Logs</h2>
      
      <table className={styles.logTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Morning</th>
            <th>Evening</th>
            <th>Count</th>
            <th>Mod Count (Count % 16)</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.morning}</td>
              <td>{log.evening}</td>
              <td>{log.count}</td>
              <td>{log.count % 16}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
