import { Link, useLocation } from "react-router-dom";
import Login from "./Login"; // import the login component

export default function Home({ isLoggedIn }) {
  const location = useLocation();

  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-b from-green-50 to-white px-6 py-10">
      {isLoggedIn ? (
        // 🔹 Logged-in view
        <div className="text-center max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-darkgreen mb-6 leading-tight">
            Build Sustainable Habits 🌱
          </h1>
          <p className="text-darkgreen text-base md:text-lg mb-8">
            Track your eco-friendly actions and make sustainability a part of your lifestyle.
            Every small effort counts — together, we make a greener world!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/profile"
              className="bg-bigbox text-darkgreen font-medium px-6 py-2.5 rounded-2xl shadow-md hover:bg-smallbox transition"
            >
              Profile
            </Link>
            <Link
              to="/stats"
              className="bg-bigbox text-darkgreen font-medium px-6 py-2.5 rounded-2xl shadow-md hover:bg-smallbox transition"
            >
              Stats
            </Link>
          </div>
        </div>
      ) : (
        // 🔹 Not logged in view (split layout)
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto gap-8">
          {/* Left section: welcome text */}
          <div className="w-full lg:w-3/4 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-darkgreen mb-6 leading-tight">
              Build Sustainable Habits 🌱
            </h1>
            <p className="text-darkgreen text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              Stay motivated and track your eco-friendly activities every day. 
              Together we can make small changes that lead to a big impact 🌍.
            </p>
            {location.pathname !== "/login" && (
              <Link
                to="/login"
                className="inline-block bg-bigbox text-darkgreen font-medium px-6 py-2.5 rounded-2xl shadow-md hover:bg-smallbox transition"
              >
                Learn More
              </Link>
            )}
          </div>

          {/* Right section: login box (25%) */}
          <div className="w-full lg:w-1/4">
            <Login />
          </div>
        </div>
      )}
    </section>
  );
}