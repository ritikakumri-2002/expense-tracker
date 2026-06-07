import { useEffect, useState } from "react";
import axios from "axios";

function SummaryPanel() {

    const [summary, setSummary] = useState(null);

    useEffect(() => {

        const fetchSummary = async () => {
            try {
                const res = await axios.get(
                    "https://expense-tracker-fs06.onrender.com/api/expenses/summary"
                );

                console.log("SUMMARY API RESPONSE:", res.data);

                setSummary(res.data);

            } catch (error) {
                console.error("Summary API error:", error);
            }
        };

        fetchSummary();

    }, []);

    if (!summary) {
        return <p>Loading summary...</p>;
    }

    return (
        <div className="card">

            <h2>Summary</h2>

            <p>Total Spent: ₹{summary.totalSpent}</p>

            <p>Highest Expense: ₹{summary.highestExpense}</p>

        </div>
    );
}

export default SummaryPanel;