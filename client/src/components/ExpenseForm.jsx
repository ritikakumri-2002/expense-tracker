import axios from "axios";
import { useState } from "react";

function ExpenseForm() {

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(
            "https://expense-tracker-fs06.onrender.com/api/expenses",
            {
                amount: Number(amount),
                category,
                date,
                note
            }
        );

        console.log(response.data);

        alert("Expense Added!");

        setAmount("");
        setCategory("");
        setDate("");
        setNote("");

    } catch (error) {

        console.error(error);

        alert("Failed to add expense");

    }

};

    return (
        <form onSubmit={handleSubmit}>

            <h2>Add Expense</h2>

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                    setAmount(e.target.value)
                }
            />

            <br />
            <br />

            <select
                value={category}
                onChange={(e) =>
                    setCategory(e.target.value)
                }
            >
                <option value="">
                    Select Category
                </option>

                <option value="Food">
                    Food
                </option>

                <option value="Transport">
                    Transport
                </option>

                <option value="Bills">
                    Bills
                </option>

                <option value="Entertainment">
                    Entertainment
                </option>

                <option value="Other">
                    Other
                </option>

            </select>

            <br />
            <br />

            <input
                type="date"
                value={date}
                onChange={(e) =>
                    setDate(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Note"
                value={note}
                onChange={(e) =>
                    setNote(e.target.value)
                }
            />

            <br />
            <br />

            <button type="submit">
                Add Expense
            </button>

        </form>
    );
}

export default ExpenseForm;