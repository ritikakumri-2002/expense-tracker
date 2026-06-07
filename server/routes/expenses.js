const express = require("express");
const fs = require("fs");
const path = require("path");
const validateExpense = require("../middleware/validateExpense");

const router = express.Router();

router.get("/", (req, res) => {

    const filePath = path.join(__dirname, "../data/expenses.json");

    const expenses = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    res.json(expenses);
});
router.get("/summary", (req, res) => {

    const filePath = path.join(
        __dirname,
        "../data/expenses.json"
    );

    const expenses = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    const totalSpent = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    const highestExpense = expenses.length > 0
        ? Math.max(
            ...expenses.map(
                expense => Number(expense.amount)
            )
        )
        : 0;

    const categoryTotals = {};

    expenses.forEach(expense => {

        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }

        categoryTotals[expense.category] += Number(
            expense.amount
        );

    });

    res.json({
        totalSpent,
        highestExpense,
        categoryTotals
    });

});
router.post("/", validateExpense, (req, res) => {

    const filePath = path.join(
        __dirname,
        "../data/expenses.json"
    );

    const expenses = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    const newExpense = {
        id: Date.now(),
        ...req.body
    };

    expenses.push(newExpense);

    fs.writeFileSync(
        filePath,
        JSON.stringify(expenses, null, 2)
    );

    res.status(201).json(newExpense);

});
router.delete("/:id", (req, res) => {

    const filePath = path.join(
        __dirname,
        "../data/expenses.json"
    );

    const expenses = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    const id = Number(req.params.id);

    const filteredExpenses = expenses.filter(
        expense => expense.id !== id
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(filteredExpenses, null, 2)
    );

    res.json({
        message: "Expense deleted successfully"
    });
});    
router.put("/:id", validateExpense, (req, res) => {

    const filePath = path.join(
        __dirname,
        "../data/expenses.json"
    );

    const expenses = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    const id = Number(req.params.id);

    const updatedExpenses = expenses.map(expense => {

        if (expense.id === id) {

            return {
                ...expense,
                ...req.body
            };

        }

        return expense;

    });

    fs.writeFileSync(
        filePath,
        JSON.stringify(updatedExpenses, null, 2)
    );

    res.json({
        message: "Expense updated successfully"
    });

});



module.exports = router;