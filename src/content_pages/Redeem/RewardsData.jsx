// src/content_pages/Redeem/RewardsData.jsx
// Lista recompenselor și etichetele de categorie

const origRewards = [
  { name: "1 Month Gym Membership", description: "Enjoy unlimited gym access for a month.", points: 1000, icon: "🏋️", category: "health", isDigital: false },
  { name: "100 Ron Lidl Gift Card", description: "Perfect for your next grocery shopping trip.", points: 600, icon: "🛒", category: "giftcards", isDigital: true },
  { name: "Reusable Water Bottle", description: "Stay hydrated and reduce single-use plastic.", points: 350, icon: "🚰", category: "eco", isDigital: false },
  { name: "Plant a Tree Certificate", description: "We plant a tree in your name.", points: 500, icon: "🌳", category: "eco", isDigital: true },
  { name: "Energy Saving LED Bulb", description: "Brighten your home efficiently.", points: 200, icon: "💡", category: "gadgets", isDigital: false },
  { name: "Bus 1-Day Pass", description: "Enjoy unlimited local bus rides for 24 hours.", points: 150, icon: "🚌", category: "transportation", isDigital: true },
  { name: "100 Ron eMag Gift Card", description: "Shop electronics, gadgets & more.", points: 700, icon: "💳", category: "giftcards", isDigital: true },
  { name: "E-Book Voucher", description: "For digital learning resources.", points: 400, icon: "📚", category: "giftcards", isDigital: true },
  { name: "Local Coffee Giftcard", description: "Enjoy a coffee in the city.", points: 150, icon: "☕", category: "giftcards", isDigital: true },
  { name: "Bike Repair Kit", description: "Be ready for your next ride.", points: 350, icon: "🚴", category: "gadgets", isDigital: false },
  { name: "Bus 7-Day Pass", description: "A full week of unlimited rides.", points: 900, icon: "🚌", category: "transportation", isDigital: true },
  { name: "Solar Charger", description: "Charge your devices sustainably with the power of the sun.", points: 800, icon: "🔋", category: "eco", isDigital: false },
  { name: "Home Compost Starter Kit", description: "Kickstart your eco journey with a home compost system.", points: 400, icon: "🌱", category: "eco", isDigital: false },
  { name: "Public Transport 1-Month Pass", description: "Go green for a month with unlimited city transport.", points: 1800, icon: "🚍", category: "transportation", isDigital: true },
  { name: "Fair Trade Coffee Pack", description: "Ethically sourced coffee for your mornings.", points: 300, icon: "☕", category: "food", isDigital: false },
  { name: "Urban Garden Workshop", description: "Learn urban gardening skills in a hands-on workshop.", points: 250, icon: "🪴", category: "eco", isDigital: false },
  { name: "Sustainable Toothbrush Set", description: "Set of 4 biodegradable, bamboo toothbrushes.", points: 90, icon: "🪥", category: "eco", isDigital: false },
  { name: "Reusable Straw Set", description: "Help reduce plastic pollution with this set of 5.", points: 60, icon: "🥤", category: "eco", isDigital: false },
  { name: "Library Annual Pass", description: "Unlimited access to your local library for a year.", points: 120, icon: "📖", category: "education", isDigital: true },
  { name: "Bike Parking Membership", description: "Monthly subscription for secure city center bike parking.", points: 160, icon: "🚲", category: "transportation", isDigital: true },
  { name: "Zero Waste Starter Box", description: "Includes beeswax wraps and soap, to help you cut waste.", points: 230, icon: "📦", category: "eco", isDigital: false },
  { name: "Eco-Friendly Detergent Pack", description: "Non-toxic, refillable laundry solution.", points: 140, icon: "🧺", category: "eco", isDigital: false },
  { name: "Plant-Based Meal Voucher", description: "Try something delicious & planet-friendly.", points: 220, icon: "🥗", category: "food", isDigital: true },
  { name: "Rain Barrel Discount", description: "Save on collecting rainwater for your garden.", points: 550, icon: "💧", category: "eco", isDigital: false },
  { name: "LED Desk Lamp", description: "Efficient, bright, long-lasting desk light.", points: 180, icon: "🛋️", category: "gadgets", isDigital: false },
  { name: "Kids’ Environmental Book", description: "Inspire a child to care for the planet!", points: 110, icon: "📘", category: "education", isDigital: false },
  { name: "Secondhand Clothes Voucher", description: "Shop sustainable fashion with this voucher.", points: 135, icon: "👕", category: "clothing", isDigital: true },
  { name: "Neighborhood Cleanup Kit", description: "Gloves, bags, and guidance for a group cleanup.", points: 160, icon: "🗑️", category: "eco", isDigital: false },
  { name: "Wildlife-friendly Birdfeeder", description: "Support garden wildlife with a safe feeder.", points: 180, icon: "🐦", category: "eco", isDigital: false },
  { name: "Thermos Food Jar", description: "Keep meals warm or cold—less packaging waste!", points: 210, icon: "🥣", category: "eco", isDigital: false }
];

const categoryLabels = {
  giftcards: "Giftcards",
  transportation: "Transportation",
  health: "Health",
  eco: "Eco",
  gadgets: "Gadgets",
  clothing: "Clothing",
  food: "Food",
  education: "Education"
};

export { origRewards, categoryLabels };

