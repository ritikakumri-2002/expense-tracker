import { useEffect, useState } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";

function ExpenseList() {

    const [expenses, setExpenses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    // LOAD EXPENSES
    useEffect(() => {

        const loadExpenses = async () => {
            try {
                const res = await axios.get(
                    "https://expense-tracker-fs06.onrender.com/api/expenses"
                );
                setExpenses(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        loadExpenses();

    }, []);

    // DELETE
    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://expense-tracker-fs06.onrender.com/api/expenses/${id}`
            );

            const res = await axios.get(
                "https://expense-tracker-fs06.onrender.com/api/expenses"
            );

            setExpenses(res.data);

        } catch (error) {
            console.error(error);
        }
    };

    // EDIT OPEN
    const handleEdit = (expense) => {
        setSelectedExpense({ ...expense });
        setIsModalOpen(true);
    };

    // UPDATE
    const handleUpdate = async () => {
        try {
            await axios.put(
                `https://expense-tracker-fs06.onrender.com/api/expenses/${selectedExpense.id}`,
                selectedExpense
            );

            setIsModalOpen(false);
            setSelectedExpense(null);

            const res = await axios.get(
                "https://expense-tracker-fs06.onrender.com/api/expenses"
            );

            setExpenses(res.data);

        } catch (error) {
            console.error(error);
        }
    };

    // FILTER
    const filteredExpenses = expenses.filter((expense) => {
        if (selectedCategory === "All") return true;

        return (
            expense.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );
    });

    // EXPORT CSV
    const exportCSV = () => {

        const headers = ["Amount", "Category", "Date", "Note"];

        const rows = expenses.map(expense => [
            expense.amount,
            expense.category,
            expense.date,
            expense.note
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows]
                .map(e => e.join(","))
                .join("\n");

        const encodedUri = encodeURI(csvContent);

        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "expenses.csv");
        document.body.appendChild(link);

        link.click();
    };
    console.log("Expenses:", expenses);
    return (
        <div>

            <h2>Expenses</h2>

            {/* FILTER BAR (CORRECT USAGE) */}
            <FilterBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {/* EXPORT BUTTON */}
            <button onClick={exportCSV} className="edit-btn">
                Export CSV
            </button>

            {/* LIST */}
            {filteredExpenses.map((expense) => (
                <div key={expense.id} className="expense-item">

                    <p>₹{expense.amount}</p>
                    <p>{expense.category}</p>
                    <p>{expense.date}</p>
                    <p>{expense.note}</p>

                    <button
                        className="edit-btn"
                        onClick={() => handleEdit(expense)}
                    >
                        Edit
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => handleDelete(expense.id)}
                    >
                        Delete
                    </button>

                </div>
            ))}

            {/* MODAL */}
            {isModalOpen && selectedExpense && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h3>Edit Expense</h3>

                        <input
                            value={selectedExpense.amount || ""}
                            onChange={(e) =>
                                setSelectedExpense({
                                    ...selectedExpense,
                                    amount: e.target.value
                                })
                            }
                            placeholder="Amount"
                        />

                        <input
                            value={selectedExpense.category || ""}
                            onChange={(e) =>
                                setSelectedExpense({
                                    ...selectedExpense,
                                    category: e.target.value
                                })
                            }
                            placeholder="Category"
                        />

                        <input
                            value={selectedExpense.date || ""}
                            onChange={(e) =>
                                setSelectedExpense({
                                    ...selectedExpense,
                                    date: e.target.value
                                })
                            }
                            placeholder="Date"
                        />

                        <input
                            value={selectedExpense.note || ""}
                            onChange={(e) =>
                                setSelectedExpense({
                                    ...selectedExpense,
                                    note: e.target.value
                                })
                            }
                            placeholder="Note"
                        />

                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>

                    </div>
                </div>
            )}

        </div>
    );
}

export default ExpenseList;