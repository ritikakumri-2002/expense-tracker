import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6"];

function Chart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        const loadData = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/expenses/summary"
                );

                const categoryTotals = res.data.categoryTotals;

                const formatted = Object.entries(categoryTotals || {}).map(
                    ([name, value]) => ({
                        name,
                        value
                    })
                );

                setData(formatted);

            } catch (error) {
                console.error(error);
            }
        };

        loadData();

    }, []);

    return (
        <div className="card">

            <h2>Expense Breakdown</h2>

            <PieChart width={350} height={300}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

                <Tooltip />
                <Legend />
            </PieChart>

        </div>
    );
}

export default Chart;