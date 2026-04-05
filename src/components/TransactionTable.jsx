import { useState } from "react";

export default function TransactionTable({ transactions, role }) {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = transactions
    .filter(t => t.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sortAsc ? new Date(a.date)-new Date(b.date) : new Date(b.date)-new Date(a.date));

  return (
    <div className="transaction-section">
      <h2>Transactions</h2>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort by Date {sortAsc ? "↑" : "↓"}
        </button>
        {role === "admin" && <button>Add Transaction</button>}
      </div>

      {filtered.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td className={t.type === "income" ? "type-income" : "type-expense"}>
                  {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


