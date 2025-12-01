
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { sibiuCenter, allLocations, getIcon } from "./mapData.jsx";

export default function RecyclingMap({ filter }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-smallbox shadow relative"
      style={{
        minHeight: 420,
        height: "60vh",
        background: "var(--color-earth)"
      }}
    >
      <MapContainer
        center={sibiuCenter}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allLocations
          .filter(loc => filter.includes(loc.type))
          .map((loc, i) => (
            <Marker key={i} position={loc.position} icon={getIcon(loc.type)}>
              <Popup>
                <b>{loc.name}</b>
                <br />
                {loc.address}
                <br />
                <span className="font-semibold">
                  {loc.type === "SGR"
                    ? "SGR (Garanție-Returnare)"
                    : loc.type}
                </span>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      <div className="px-5 py-2 text-xs text-darkgreen bg-white opacity-80 absolute bottom-2 left-2 rounded z-10">
        Map data © OpenStreetMap contributors
      </div>
    </div>
  );
}
