import logo from '../assets/logo-green-habits.png';

export default function Header({ isLoggedIn, handleLogout, toggleLoginState }) {
  return (
    <header className="bg-[#255938] text-[#F5EFE6] py-2 px-4 shadow-md relative">
      <div className="grid grid-cols-3 items-center w-full">
        {/* Logo la stânga */}
        <div className="justify-self-start">
          <img
            src={logo}
            alt="Green Habits Logo"
            style={{ width: '400px', height: 'auto' }}
          />
        </div>
        {/* Mesaj centrat */}
        <div className="justify-self-center">
          <span
            className="text-2xl font-bold tracking-wide text-center"
            style={{ color: 'beige' }}
          >
            Track your eco-friendly habits daily!
          </span>
        </div>
        {/* Butoane la dreapta */}
        <div className="flex gap-2 justify-self-end">
          <button
            onClick={toggleLoginState}
            className="bg-[#d4927e] text-[#2d5016] px-3 py-1 rounded hover:opacity-90 transition font-bold text-sm"
          >
            TEST: {isLoggedIn ? 'Logged In ' : 'Logged Out '}
          </button>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-[#d4927e] text-[#2d5016] px-3 py-1 rounded hover:opacity-90 transition font-bold text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}