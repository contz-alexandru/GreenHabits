// src/content_pages/leaderboard/SortControls.jsx
// Butoane pentru sortarea clasamentului

export default function SortControls({ selectedField, setSelectedField, fields }) {
  return (
    <div className="flex gap-2 mb-4">
      {fields.map((field) => (
        <button
          key={field.id}
          onClick={() => setSelectedField(field.id)}
          className={`px-4 py-1.5 rounded-lg font-semibold border text-sm
            ${selectedField === field.id
              ? "bg-darkgreen text-fundal border-darkgreen"
              : "bg-beige text-darkgreen border-smallbox hover:bg-earth"}`}
          style={{
            backgroundColor: selectedField === field.id ? "var(--color-darkgreen)" : "var(--color-beige)",
            color: selectedField === field.id ? "var(--color-fundal)" : "var(--color-darkgreen)",
            borderColor: selectedField === field.id ? "var(--color-darkgreen)" : "var(--color-smallbox)"
          }}
        >
          {field.label}
        </button>
      ))}
    </div>
  );
}
