
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import { markerTypes } from "../content_pages/Map/mapData.jsx";
import MapFilters from "../content_pages/Map/mapFilters";
import RecyclingMap from "../content_pages/Map/recyclingMap";
import MapFooter from "../content_pages/Map/mapFooter";

export default function Map() {
  const [filter, setFilter] = useState(markerTypes);
  function toggleType(type) {
    setFilter(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  }

  return (
    <main className="min-h-screen p-8 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <section
          className="w-full bg-bigbox rounded-2xl p-7 shadow-md border border-smallbox flex flex-col"
          style={{
            backgroundColor: "var(--color-bigbox)",
            borderColor: "var(--color-smallbox)"
          }}
        >
          <h2
            className="text-2xl font-extrabold mb-4"
            style={{ color: "var(--color-darkgreen)" }}
          >
            ♻️ Harta Reciclării Sibiu
          </h2>

          <MapFilters filter={filter} toggleType={toggleType} />

          <RecyclingMap filter={filter} />

          <MapFooter />
        </section>
      </div>
    </main>
  );
}
