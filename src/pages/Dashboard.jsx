import React, { useState } from "react";
import TransactionTable from "../components/TransactionTable";
import "../styles/style.css";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [role, setRole] = useState("viewer");

  // Mock transactions
  const transactions = [
    { id: 1, date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
    { id: 2, date: "2026-04-02", amount: 1200, category: "Food", type: "expense" },
    { id: 3, date: "2026-04-03", amount: 800, category: "Transport", type: "expense" },
    { id: 4, date: "2026-04-04", amount: 2000, category: "Freelance", type: "income" },
  ];

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  // Insights
  const categories = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    }
  });
  const highestSpendingCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b, "");

  // Chart data
  const lineData = {
    labels: transactions.map(t => t.date),
    datasets: [
      {
        label: "Balance Over Time",
        data: transactions.map((_, i) => transactions.slice(0, i+1).reduce((sum, t) => sum + (t.type==="income"? t.amount : -t.amount), 0)),
        borderColor: "#22c55e",
        backgroundColor: "#22c55e33",
      }
    ]
  };

  const pieData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Spending by Category",
        data: Object.values(categories),
        backgroundColor: ["#ef4444", "#facc15", "#3b82f6", "#10b981"],
      }
    ]
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Finance Dashboard</h1>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Cards */}
      <div className="cards">
        <div className="card">💰 Balance: ₹{balance}</div>
        <div className="card">📈 Income: ₹{totalIncome}</div>
        <div className="card">📉 Expenses: ₹{totalExpense}</div>
        <div className="card">🏆 Highest Spending: {highestSpendingCategory || "N/A"}</div>
      </div>

      {/* Charts */}
      <div className="charts" style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "300px", background: "#1e293b", padding: "15px", borderRadius: "10px" }}>
          <Line data={lineData} />
        </div>
        <div style={{ flex: 1, minWidth: "300px", background: "#1e293b", padding: "15px", borderRadius: "10px" }}>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Transactions */}
      <TransactionTable transactions={transactions} role={role} />
    </div>
  );
}
Dashboard.jsx
Dashboard.jsx
Dashboard.jsx

Dashboard.jsx
Dashboard.jsx

