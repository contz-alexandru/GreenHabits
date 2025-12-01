import L from "leaflet";

export const sibiuCenter = [45.7928, 24.1521];

export const iconUrls = {
  Plastic: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  Glass: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  Electronics: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  Batteries: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
  Donations: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  Paper: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  Textiles: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
  Aluminum: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png",
  SGR: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png"
};

export function getIcon(type) {
  return new L.Icon({
    iconUrl: iconUrls[type] || iconUrls.Plastic,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

export const allLocations = [
  { name: "Glass Recycling Bin Promenada Mall", type: "Glass", address: "Str. Lector 1, Sibiu", position: [45.7856, 24.1599] },
  { name: "Battery Collection Mega Image", type: "Batteries", address: "Str. Rahovei 34, Sibiu", position: [45.7838, 24.1465] },
  { name: "Clothing Donation Bin Dumbrăvii", type: "Donations", address: "Calea Dumbrăvii 26, Sibiu", position: [45.7868, 24.1561] },
  { name: "Textile Recycling Lidl Terezian", type: "Textiles", address: "Șos. Alba Iulia 75, Sibiu", position: [45.8040, 24.1425] },
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
  { name: "Textile Bin - Shopping City Mall", type: "Textiles", address: "Șos. Sibiului 5, Selimbăr", position: [45.8007, 24.1319] },
  { name: "Simcris Recycling", type: "Electronics", address: "Str. Presaca 4, Sibiu", position: [45.8141, 24.1344] },
  { name: "Piața Unirii Clothing Bin", type: "Donations", address: "Piața Unirii, Sibiu", position: [45.7925, 24.1501] },
  { name: "Promenada Mall Clothing Bin", type: "Donations", address: "Strada Lector 1-3, Selimbăr", position: [45.7856, 24.1599] },

  { name: "SGR Lidl Alba Iulia", type: "SGR", address: "Șos. Alba Iulia 47A, Sibiu", position: [45.8040, 24.1425] },
  { name: "SGR Auchan Selimbăr", type: "SGR", address: "Șoseaua Sibiului 5, Selimbăr", position: [45.8007, 24.1319] },
  { name: "SGR Kaufland Cisnădiei", type: "SGR", address: "Calea Cisnădiei 92, Sibiu", position: [45.7598, 24.1832] },
  { name: "SGR Kaufland Selimbăr", type: "SGR", address: "DN1, nr. 1A, Selimbăr", position: [45.7671, 24.1808] },
  { name: "SGR Carrefour Shopping City", type: "SGR", address: "Șos. Sibiului 5, Selimbăr", position: [45.8004, 24.1317] },
  { name: "SGR Mega Image Rahova", type: "SGR", address: "Str. Rahovei 34, Sibiu", position: [45.7838, 24.1465] },
  { name: "SGR Mega Image Compozitorilor", type: "SGR", address: "Strada Compozitorilor 2A, Sibiu", position: [45.79722, 24.14831] },
  { name: "SGR DM Shopping City", type: "SGR", address: "DN1 km 306, Selimbăr", position: [45.8007, 24.1319] }
];

export const markerTypes = [
  "Plastic",
  "Glass",
  "Electronics",
  "Batteries",
  "Donations",
  "Paper",
  "Textiles",
  "Aluminum",
  "SGR"
];

export const markerButtonColors = {
  Plastic: "#3388ff",
  Glass: "#28a745",
  Electronics: "#ffe600",
  Batteries: "#a020f0",
  Donations: "#e53935",
  Paper: "#ff9800",
  Textiles: "#888888",
  Aluminum: "#000",
  SGR: "#a0522d"
};
