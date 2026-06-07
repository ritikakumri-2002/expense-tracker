import "./App.css";
import { useState, useEffect } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";
import Chart from "./components/Chart";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    const [darkMode, setDarkMode] = useState(false);

    // LOAD SAVED THEME
    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            setDarkMode(true);
        }
    }, []);

    // TOGGLE THEME
    const toggleDarkMode = () => {
        setDarkMode(prev => {
            localStorage.setItem("darkMode", !prev);
            return !prev;
        });
    };

    return (
        <div className={darkMode ? "container dark" : "container"}>

            {/* TOAST */}
            <ToastContainer position="top-right" autoClose={2000} />

            {/* HEADER */}
            <h1 className="title">💰 Expense Tracker Dashboard</h1>

            {/* DARK MODE BUTTON */}
            <button onClick={toggleDarkMode} className="edit-btn">
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {/* SUMMARY */}
            <div className="section">
                <SummaryPanel />
            </div>

            {/* CHART + FORM */}
            <div className="grid">

                <div className="card">
                    <Chart />
                </div>

                <div className="card">
                    <ExpenseForm />
                </div>

            </div>

            {/* LIST */}
            <div className="section">
                <ExpenseList />
            </div>

        </div>
    );
}

export default App;