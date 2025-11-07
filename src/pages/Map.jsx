import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from "react";
import L from 'leaflet';

const sibiuCenter = [45.7928, 24.1521];

const iconUrls = {
  Plastic: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  Glass: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
  Electronics: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  Batteries: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
  Donations: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  Paper: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  Textiles: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  Aluminum: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png"
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
  { name: "Plastic Container Kaufland", type: "Plastic", address: "Str. Mihai Viteazu 2, Sibiu", position: [45.7937, 24.1405] },
  { name: "Glass Recycling Bin Promenada Mall", type: "Glass", address: "Str. Lector 1, Sibiu", position: [45.7856, 24.1599] },
  { name: "Electronics Collection Carrefour", type: "Electronics", address: "Str. Sibiului 5, Sibiu", position: [45.8004, 24.1317] },
  { name: "Battery Collection Mega Image", type: "Batteries", address: "Str. Rahovei 34, Sibiu", position: [45.7838, 24.1465] },
  { name: "Clothing Donation Bin Dumbrăvii", type: "Donations", address: "Calea Dumbrăvii 26, Sibiu", position: [45.7868, 24.1561] },
  { name: "Paper Recycling ASTRA Park", type: "Paper", address: "Bd. Victoriei 31, Sibiu", position: [45.7889, 24.1518] },
  { name: "Textile Recycling Lidl Terezian", type: "Textiles", address: "Șos. Alba Iulia 75, Sibiu", position: [45.8040, 24.1425] },
  { name: "Aluminium Can Bank OMV", type: "Aluminum", address: "Șos. Alba Iulia 32, Sibiu", position: [45.7975, 24.1441] },
  { name: "Plastic & Paper Bin School No. 21", type: "Plastic", address: "Șos. Alba Iulia 38, Sibiu", position: [45.7983, 24.1428] },
  { name: "Recycling Center Valea Aurie", type: "Electronics", address: "Str. Valea Aurie 52, Sibiu", position: [45.7821, 24.1235] },
  { name: "Central Market Glass Bin", type: "Glass", address: "Piața Mare, Sibiu", position: [45.7972, 24.1519] },
  { name: "Valea Săpunului Clothing Bin", type: "Donations", address: "Str. Valea Săpunului 10, Sibiu", position: [45.7824, 24.1122] },
  { name: "Paper GTC Complex", type: "Paper", address: "Str. Rusciorului 7, Sibiu", position: [45.8015, 24.1538] },
  { name: "Plastic Gară Bin", type: "Plastic", address: "Piața 1 Decembrie 1918, Sibiu", position: [45.7924, 24.1513] },
  { name: "Aluminum Recycling Lidl Turnișor", type: "Aluminum", address: "Calea Turnișorului 120, Sibiu", position: [45.7967, 24.1164] },
  { name: "Textile Bin Hipodrom", type: "Textiles", address: "Str. Luptei 52, Sibiu", position: [45.7790, 24.1461] },
  { name: "Battery Bin Str. Lungă", type: "Batteries", address: "Str. Lungă 18, Sibiu", position: [45.7862, 24.1445] },
  { name: "Electronics Flanco", type: "Electronics", address: "Str. Constituției 21, Sibiu", position: [45.8019, 24.1592] },
  { name: "Plastic Bin Sub Arini Park", type: "Plastic", address: "Bulevardul Victoriei 24, Sibiu", position: [45.7880, 24.1398] },
  { name: "Donations Piața Cibin", type: "Donations", address: "Piața Cibin, Sibiu", position: [45.7995, 24.1432] },
  { name: "Glass Bin Ana Hotel", type: "Glass", address: "Str. Scoala de Înot 3, Sibiu", position: [45.7929, 24.1471] },
  { name: "Textiles Bin Profi Terezian", type: "Textiles", address: "Str. Lemnelor 12, Sibiu", position: [45.8073, 24.1376] },
  { name: "Paper Bin Hipodrom Bulevard", type: "Paper", address: "Bulevardul Vasile Milea 19, Sibiu", position: [45.7832, 24.1544] },
  { name: "Aluminum Bin Gara Mică", type: "Aluminum", address: "Str. Nicolae Teclu 26, Sibiu", position: [45.7948, 24.1497] },
  { name: "Batteries Atabla Supermarket", type: "Batteries", address: "Str. Școala de Înot 19, Sibiu", position: [45.7928, 24.1488] },
  { name: "Donations St. Family Church", type: "Donations", address: "Str. Ludoș 1, Sibiu", position: [45.7846, 24.1560] },
  { name: "Electronics Bin Turnișor", type: "Electronics", address: "Str. Fratelia 6, Sibiu", position: [45.7933, 24.1197] },
  { name: "Glass Bin Lidl Rahova", type: "Glass", address: "Str. Rahovei 32, Sibiu", position: [45.7812, 24.1552] },
  { name: "Paper Brâncoveanu School", type: "Paper", address: "Str. Brâncoveanu 24, Sibiu", position: [45.8000, 24.1377] },
  { name: "Plastic + Aluminum Bin Orlatului", type: "Plastic", address: "Str. Orlatului 14, Sibiu", position: [45.8088, 24.1326] },
  { name: "Batteries Bin Dumbrăvii", type: "Batteries", address: "Calea Dumbrăvii 102, Sibiu", position: [45.7827, 24.1613] },
  { name: "Textiles Bin Selimbar", type: "Textiles", address: "Str. Mihail Sebastian 13, Sibiu", position: [45.7713, 24.1710] },
  { name: "Aluminum Bin Piata Rahova", type: "Aluminum", address: "Piața Rahova, Sibiu", position: [45.7810, 24.1580] }
];

const markerTypes = [
  "Plastic", "Glass", "Electronics", "Batteries", "Donations",
  "Paper", "Textiles", "Aluminum"
];

const markerButtonColors = {
  Plastic: "#3388ff",      // Blue
  Glass: "#757575",        // Grey
  Electronics: "#ffe600",  // Yellow
  Batteries: "#a020f0",    // Violet
  Donations: "#e53935",    // Red
  Paper: "#ff9800",        // Orange
  Textiles: "#28a745",     // Green
  Aluminum: "#757575"      // Grey (dark)
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
                  color: type === "Electronics" || type === "Paper" ? "#232210" : "#fff",
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
                    <span className="font-semibold">{loc.type}</span>
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
