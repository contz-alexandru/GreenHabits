import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from "react";
import L from 'leaflet';

const sibiuCenter = [45.7928, 24.1521];

// Use only available icons from leaflet-color-markers
const iconUrls = {
  Plastic:     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",     // blue
  Glass:       "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",    // green
  Electronics: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",   // yellow
  Batteries:   "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",   // violet
  Donations:   "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",      // red
  Paper:       "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",   // orange
  Textiles:    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",     // grey
  Aluminum:    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png",    // black
  SGR:         "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png"     // pink
};

function getIcon(type) {
  return new L.Icon({
    iconUrl: iconUrls[type] || iconUrls.Plastic,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

const allLocations = [
  // Unique, non-overlapping recycling/donation markers
  { name: "Glass Recycling Bin Promenada Mall", type: "Glass", address: "Str. Lector 1, Sibiu", position: [45.7856, 24.1599] },
  { name: "Battery Collection Mega Image", type: "Batteries", address: "Str. Rahovei 34, Sibiu", position: [45.7838, 24.1465] }, // SGR present, but battery is a specialty bin
  { name: "Clothing Donation Bin Dumbrăvii", type: "Donations", address: "Calea Dumbrăvii 26, Sibiu", position: [45.7868, 24.1561] },
  { name: "Textile Recycling Lidl Terezian", type: "Textiles", address: "Șos. Alba Iulia 75, Sibiu", position: [45.8040, 24.1425] }, // Lidl SGR is at 47A; this is a unique address
  { name: "Aluminium Can Bank OMV", type: "Aluminum", address: "Șos. Alba Iulia 32, Sibiu", position: [45.7975, 24.1441] },
  { name: "Plastic & Paper Bin School No. 21", type: "Plastic", address: "Șos. Alba Iulia 38, Sibiu", position: [45.7983, 24.1428] },
  { name: "Central Market Glass Bin", type: "Glass", address: "Piața Mare, Sibiu", position: [45.7972, 24.1519] },
  { name: "Plastic Gară Bin", type: "Plastic", address: "Piața 1 Decembrie 1918, Sibiu", position: [45.7924, 24.1513] },
  { name: "Aluminum Recycling Lidl Turnișor", type: "Aluminum", address: "Calea Turnișorului 120, Sibiu", position: [45.7967, 24.1164] },
  { name: "Textile Bin Hipodrom", type: "Textiles", address: "Str. Luptei 52, Sibiu", position: [45.7790, 24.1461] },
  { name: "Electronics Flanco", type: "Electronics", address: "Str. Constituției 21, Sibiu", position: [45.8019, 24.1592] },
  { name: "Glass Bin Ana Hotel", type: "Glass", address: "Str. Scoala de Înot 3, Sibiu", position: [45.7929, 24.1471] },
  { name: "Textiles Bin Profi Terezian", type: "Textiles", address: "Str. Lemnelor 12, Sibiu", position: [45.8073, 24.1376] },
  { name: "Glass Bin Lidl Rahova", type: "Glass", address: "Str. Rahovei 32, Sibiu", position: [45.7812, 24.1552] },
  { name: "Aluminum Bin Piata Rahova", type: "Aluminum", address: "Piața Rahova, Sibiu", position: [45.7810, 24.1580] },
  { name: "Textile Bin - Shopping City Mall", type: "Textiles", address: "Șos. Sibiului 5, Selimbăr", position: [45.8007, 24.1319] }, // SGR same address, but textiles is a unique function.
  { name: "Simcris Recycling", type: "Electronics", address: "Str. Presaca 4, Sibiu", position: [45.8141, 24.1344] },
  { name: "Piața Unirii Clothing Bin", type: "Donations", address: "Piața Unirii, Sibiu", position: [45.7925, 24.1501] },
  { name: "Promenada Mall Clothing Bin", type: "Donations", address: "Strada Lector 1-3, Selimbăr", position: [45.7856, 24.1599] },

  // SGR (all overlapping glass/plastic/aluminum/plastic pins at these addresses are now removed)
  { name: "SGR Lidl Alba Iulia", type: "SGR", address: "Șos. Alba Iulia 47A, Sibiu", position: [45.8040, 24.1425] },
  { name: "SGR Auchan Selimbăr", type: "SGR", address: "Șoseaua Sibiului 5, Selimbăr", position: [45.8007, 24.1319] },
  { name: "SGR Kaufland Cisnădiei", type: "SGR", address: "Calea Cisnădiei 92, Sibiu", position: [45.7598, 24.1832] },
  { name: "SGR Kaufland Selimbăr", type: "SGR", address: "DN1, nr. 1A, Selimbăr", position: [45.7671, 24.1808] },
  { name: "SGR Carrefour Shopping City", type: "SGR", address: "Șos. Sibiului 5, Selimbăr", position: [45.8004, 24.1317] },
  { name: "SGR Mega Image Rahova", type: "SGR", address: "Str. Rahovei 34, Sibiu", position: [45.7838, 24.1465] },
  { name: "SGR Mega Image Compozitorilor", type: "SGR", address: "Strada Compozitorilor 2A, Sibiu", position: [45.79722, 24.14831] },
  { name: "SGR DM Shopping City", type: "SGR", address: "DN1 km 306, Selimbăr", position: [45.8007, 24.1319] }
];


const markerTypes = [
  "Plastic", "Glass", "Electronics", "Batteries", "Donations",
  "Paper", "Textiles", "Aluminum", "SGR"
];

const markerButtonColors = {
  Plastic: "#3388ff",   // blue
  Glass: "#28a745",     // green
  Electronics: "#ffe600",
  Batteries: "#a020f0",
  Donations: "#e53935", // red
  Paper: "#ff9800",
  Textiles: "#888888",  // grey
  Aluminum: "#000",
  SGR: "#a0522d"        // brown
};

export default function Map() {
  const [filter, setFilter] = useState(markerTypes);

  function toggleType(type) {
    setFilter((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  }

  return (
    <main className="bg-fundal min-h-screen p-8" style={{ backgroundColor: "var(--color-fundal)" }}>
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <section className="w-full bg-bigbox rounded-2xl p-7 shadow-md border border-smallbox flex flex-col"
          style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}>
          <h2 className="text-2xl font-extrabold mb-4" style={{ color: "var(--color-darkgreen)" }}>
            ♻️ Harta Reciclării Sibiu
          </h2>
          <div className="mb-4 flex flex-wrap gap-2 items-center">
            <label className="font-semibold text-darkgreen mr-2">Filtrează:</label>
            {markerTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                style={{
                  background: markerButtonColors[type],
                  color: "#fff",
                  border: filter.includes(type) ? "2.5px solid #388e5f" : "1.5px solid #455d5a",
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
          <div className="rounded-2xl overflow-hidden border border-smallbox shadow relative"
            style={{ minHeight: 420, height: "60vh", background: "var(--color-earth)" }}>
            <MapContainer center={sibiuCenter} zoom={13} style={{ width: "100%", height: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {allLocations.filter(loc => filter.includes(loc.type)).map((loc, i) => (
                <Marker key={i} position={loc.position} icon={getIcon(loc.type)}>
                  <Popup>
                    <b>{loc.name}</b><br />
                    {loc.address}<br />
                    <span className="font-semibold">{loc.type === "SGR" ? "SGR (Garanție-Returnare)" : loc.type}</span>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            <div className="px-5 py-2 text-xs text-darkgreen bg-white opacity-80 absolute bottom-2 left-2 rounded z-10">
              Map data © OpenStreetMap contributors
            </div>
          </div>
          <div className="mt-4 text-xs text-darkgreen border-t pt-2">
            Markers inspired by <a href="https://localizare.hartareciclarii.ro/" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Harta Reciclării</a>.
          </div>
        </section>
      </div>
    </main>
  );
}
