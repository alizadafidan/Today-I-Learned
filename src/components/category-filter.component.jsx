function CategoryFilter({ setCurrentCategory, categories }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            onClick={() => setCurrentCategory("all")}
            className="btn btn-all-categories"
          >
            ALL
          </button>
        </li>
        {categories.map((cat) => {
          return (
            <li key={cat.name} className="category">
              <button
                onClick={() => setCurrentCategory(cat.name)}
                className="btn btn-category"
                style={{ backgroundColor: cat.color }}
              >
                {cat.name.toUpperCase()}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
