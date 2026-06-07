const validateExpense = (req, res, next) => {

    const { amount, category, date } = req.body;

    // Amount validation
    if (!amount || amount <= 0) {
        return res.status(400).json({
            message: "Amount must be greater than 0"
        });
    }

    // Category validation
    if (!category || category.trim() === "") {
        return res.status(400).json({
            message: "Category is required"
        });
    }

    // Allowed categories
    const allowedCategories = [
        "Food",
        "Transport",
        "Bills",
        "Entertainment",
        "Other"
    ];

    if (!allowedCategories.includes(category)) {
        return res.status(400).json({
            message: "Invalid category"
        });
    }

    // Date validation
    if (!date) {
        return res.status(400).json({
            message: "Date is required"
        });
    }

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
        return res.status(400).json({
            message: "Future dates are not allowed"
        });
    }

    next();
};

module.exports = validateExpense;