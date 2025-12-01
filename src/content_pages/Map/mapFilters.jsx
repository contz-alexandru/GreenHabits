
import { markerTypes, markerButtonColors } from "./mapData.jsx";
export default function MapFilters({ filter, toggleType }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2 items-center">
      <label className="font-semibold text-darkgreen mr-2">
        Filtrează:
      </label>
      {markerTypes.map(type => (
        <button
          key={type}
          onClick={() => toggleType(type)}
          style={{
            background: markerButtonColors[type],
            color: "#fff",
            border: filter.includes(type)
              ? "2.5px solid #388e5f"
              : "1.5px solid #455d5a",
            borderRadius: "0.5rem",
            fontWeight: 600,
            fontSize: "13px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            padding: "7px 17px",
            opacity: filter.includes(type) ? 1 : 0.4
          }}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
