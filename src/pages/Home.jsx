import { Link, useLocation } from "react-router-dom";
import Login from "./Login";
import { useEffect, useState } from "react";
import { origRewards } from "./Redeem"; // ajustează calea dacă e nevoie

export default function Home({ isLoggedIn, user }) {
  const location = useLocation();

  // 🔹 Citate motivaționale
  const quotes = [
    "We do not inherit the Earth from our ancestors, we borrow it from our children.",
    "Small acts, when multiplied by millions of people, can transform the world.",
    "The greatest threat to our planet is the belief that someone else will save it.",
    "Live simply so others may simply live.",
    "Nature does not hurry, yet everything is accomplished.",
  ];
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  }, []);

  // 🔹 Fallback user pentru testare
  const fallbackUser = {
    ecoPoints: 1600,
    totalHabits: 42,
    co2Saved: 10.07,
    rewards: 5,
  };
  const activeUser = user || fallbackUser;

  // 🔹 Recompense disponibile
  const availableRewards = origRewards
    .filter(r => activeUser.ecoPoints >= r.points)
    .slice(0, 3);

  const stats = [
    { label: "Total Habits Completed", value: activeUser.totalHabits },
    { label: "CO₂ Saved (kg)", value: activeUser.co2Saved },
    { label: "Eco Points", value: activeUser.ecoPoints },
    { label: "Redeemed Rewards", value: activeUser.rewards },
  ];

  return (
    <section className="min-h-screen px-10 py-10">

        
      {/* 🔹 Text principal — vizibil doar când utilizatorul este autentificat */}
{isLoggedIn && (
  <div className="text-center max-w-4xl mx-auto mt-16 mb-16">
    <h1 className="text-3xl md:text-5xl font-bold text-darkgreen mb-6 leading-tight">
      Build Sustainable Habits 🌱
    </h1>
    <p className="text-darkgreen text-base md:text-lg">
      Track your eco-friendly actions and make sustainability a part of your lifestyle.
      Every small effort counts — together, we make a greener world!
    </p>
  </div>
)}


      {/* 🔹 Card mare cu statistici */}
      {isLoggedIn && (
        <div className="bg-[#DDE6D6] rounded-3xl shadow-xl p-10 max-w-6xl mx-auto border border-[#C9D7C3] mb-12">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-8 text-center">Your Eco Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#F5EFE6] rounded-2xl shadow-md p-6 text-center border border-[#C9D7C3]"
              >
                <h3 className="text-lg font-semibold text-[#2d5016] mb-2">{stat.label}</h3>
                <p className="text-3xl font-bold text-[#255938]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 🔹 Citat motivațional cu lungime egală */}
      {isLoggedIn && (
      
          <div className="bg-[#DDE6D6] rounded-3xl shadow-xl p-10 max-w-6xl mx-auto border border-[#C9D7C3] mb-12 text-center">
         <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Eco Inspiration </h2>
         <p className="italic text-[#2d5016] text-lg">“{quote}”</p>
        </div>

             )}

        


      {/* 🔹 Recomandări de recompense */}
      {isLoggedIn && (
        <div className="bg-[#DDE6D6] rounded-3xl shadow-xl p-10 max-w-6xl mx-auto border border-[#C9D7C3] mb-12">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-8 text-center">Rewards You Can Redeem 🎁</h2>
          {availableRewards.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {availableRewards.map((reward, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F5EFE6] rounded-xl shadow-md p-6 border border-[#C9D7C3] flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{reward.icon}</span>
                      <span className="text-lg font-semibold text-[#2d5016]">{reward.name}</span>
                    </div>
                    <p className="text-sm text-[#2d5016] mb-4">{reward.description}</p>
                    <p className="text-base font-bold text-[#255938]">{reward.points} points</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/redeem"
                  className="inline-block bg-[#2d5016] text-[#F5EFE6] font-semibold px-6 py-2.5 rounded-xl shadow-md hover:opacity-90 transition"
                >
                  <p className="text-center text-beige font-medium">
                  See all rewards
                  </p>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center text-[#2d5016] font-medium">
              You don't have enough points to claim a reward at the moment.
            </p>
          )}
        </div>
      )}
     {/* 🔹 Secțiune principală — doar pentru utilizatori NEautentificați */}
{!isLoggedIn && (
  <div className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] max-w-6xl mx-auto px-6">
    {/* Text principal */}
    <div className="w-full lg:w-3/4 text-left mb-10 lg:mb-0">
      <h1 className="text-3xl md:text-5xl font-bold text-darkgreen mb-4 leading-tight">
        Build Sustainable Habits 🌱
      </h1>
      <p className="text-darkgreen text-base md:text-lg mb-6 max-w-2xl">
        Track your eco-friendly actions and make sustainability a part of your lifestyle.
        Every small effort counts — together, we make a greener world!
      </p>
      <p className="text-darkgreen text-base md:text-lg mb-6 max-w-lg">
        Stay motivated and track your eco-friendly activities every day. 
        Together we can make small changes that lead to a big impact 🌍.
      </p>
    </div>

    {/* Formular Login */}
    <div className="w-full lg:w-1/4">
      <Login />
    </div>
  </div>
)}


    </section>
  );
}
