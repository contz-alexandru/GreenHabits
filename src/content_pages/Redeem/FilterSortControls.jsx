// src/content_pages/Redeem/FilterSortControls.jsx
// Componentă pentru controalele de filtrare și sortare a recompenselor

export default function FilterSortControls({
  selectedCategory,
  setSelectedCategory,
  categoryOptions,
  sortOrder,
  setSortOrder
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-3">
      {/* Category */}
      <div className="w-full md:w-auto">
        <select
          className="bg-bigbox border border-smallbox rounded-lg px-4 py-2 text-darkgreen font-semibold"
          style={{
            backgroundColor: "var(--color-bigbox)",
            borderColor: "var(--color-smallbox)",
            color: "var(--color-darkgreen)"
          }}
          value={selectedCategory}
          onChange={e => {
            setSelectedCategory(e.target.value);
          }}
        >
          {categoryOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {/* Sort */}
      <div className="w-full md:w-auto flex items-center gap-2">
        <label className="text-md font-semibold" style={{ color: "var(--color-darkgreen)" }}>Sort by points:</label>
        <button
          className="ml-1 px-4 py-2 rounded-lg border border-darkgreen bg-beige font-bold transition hover:bg-smallbox"
          style={{
            backgroundColor: "var(--color-beige)",
            borderColor: "var(--color-darkgreen)",
            color: "var(--color-darkgreen)"
          }}
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
        >
          {sortOrder === "desc" ? "Highest → Lowest" : "Lowest → Highest"}
        </button>
      </div>
    </div>
  );
}
