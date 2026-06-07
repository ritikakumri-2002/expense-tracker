function FilterBar({ selectedCategory, setSelectedCategory }) {

    return (
        <div className="filter-bar">

            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
            </select>

        </div>
    );
}

export default FilterBar;