const express = require("express");
const cors = require("cors");
const expenseRoutes = require("./routes/expenses");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Expense Tracker Backend Running");
});
app.use("/api/expenses", expenseRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});