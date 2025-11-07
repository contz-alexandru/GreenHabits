import { Link, Navigate, useLocation } from "react-router-dom";

export default function Home({ isLoggedIn }) {
  const location = useLocation();

  return (
    <section className="text-center py-6 px-4">
      <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-darkgreen">
        Build Sustainable Habits
      </h2>
      <p className="text-darkgreen mb-6 max-w-xl mx-auto">
        Stay motivated and track your eco-friendly activities every day. Small actions lead to big impact!
      </p>
      {isLoggedIn ? (
        <>
          <Link to="/profile" className="bg-bigbox text-darkgreen px-6 py-2 rounded hover:bg-smallbox transition ml-4">Profile</Link>
          <Link to="/stats" className="bg-bigbox text-darkgreen px-6 py-2 rounded hover:bg-smallbox transition ml-4">Stats</Link>
        </>
      ) : (
        location.pathname !== '/login' && (
          <Link to="/login" className="bg-bigbox text-darkgreen px-6 py-2 rounded hover:bg-smallbox transition ml-4">Login</Link>
        )
      )}
    </section>
  );
}
