import { useEffect, useState } from "react";
import { db } from "../firebase/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Jane Doe",
    username: "ecoJane",
    email: "jane@example.com",
    totalHabits: 42,
    ecoPoints: 850,
    profilePicture: "",
    // uid: "dummy-id" // dacă vrei demo, setează și un uid
  });
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const firstName = user?.name?.split(" ")[0] || "Profile";
  const [newUsername, setNewUsername] = useState(user.username);
  const [newProfilePic, setNewProfilePic] = useState("");

  // poți înlocui cu id real dacă folosești auth
  const auth = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      // decide pe ce uid cauți: user.uid sau auth.user.uid
      const uid = (user && user.uid) || (auth && auth.user && auth.user.uid);
      if (!uid) {
        // fallback pe user local inițial
        setUserData(user);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(user); // fallback
          console.log("Nu există date pentru acest utilizator!");
        }
      } catch (error) {
        setUserData(user);
        console.error("Eroare la citirea datelor din Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    // eslint-disable-next-line
  }, [user, auth && auth.user]);

  const toggleHabit = (id) => {
    if (!userData?.habits) return;
    setUserData((prev) => ({
      ...prev,
      habits: prev.habits.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      ),
    }));
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-darkgreen">
        Se încarcă profilul...
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center mt-10 text-red-600">
        Nu s-au găsit datele utilizatorului.
      </div>
    );
  }

  return (
    <main className="p-10 max-w-5xl mx-auto space-y-10">
      {/* 🔹 Text principal */}
      <div className="text-center max-w-4xl mx-auto mt-16 mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-darkgreen mb-6 leading-tight">
          Congratulations! You currently have <span className="font-bold">{userData?.ecoPoints || 0}</span> Eco Points 🌿
        </h1>
      </div>

      {/* Card principal */}
      <section className="bg-[#DDE6D6] p-12 rounded-3xl shadow-xl border border-[#C9D7C3] h-[500px] flex">
        {/* Informații utilizator */}
        <div className="flex-1 flex flex-col justify-center space-y-4 text-lg">
          <h2 className="text-4xl font-semibold mb-4 text-[#2E4D32]">Profile</h2>
          <p className="text-[#2E4D32]">
            <strong>Name:</strong> {userData.name}
          </p>
          <p className="text-[#2E4D32]">
            <strong>Username:</strong> {userData.username}
          </p>
          <p className="text-[#2E4D32]">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="text-[#2E4D32]">
            <strong>Total Habits Completed:</strong> {userData.totalHabits}
          </p>
        </div>

        {/* Poză de profil centrată vertical */}
        <div className="flex-1 flex items-center justify-center">
          {userData.profilePicture ? (
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="w-64 h-64 object-cover rounded-full shadow-lg opacity-90"
            />
          ) : (
            <div className="w-64 h-64 rounded-full bg-[#9BB597] flex items-center justify-center text-[#2E4D32] font-semibold opacity-50">
              No Image
            </div>
          )}
        </div>
      </section>

      {/* Habits Section */}
      {userData.habits && userData.habits.length > 0 && (
        <section className="bg-bigbox p-6 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-darkgreen">Your Habits</h3>
          <ul className="space-y-4">
            {userData.habits.map((habit) => (
              <li
                key={habit.id}
                className={`flex items-center justify-between p-3 border rounded shadow-sm transition ${
                  habit.done ? "bg-smallbox text-darkgreen" : "bg-earth"
                }`}
              >
                <span className="text-darkgreen">{habit.name}</span>
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${
                    habit.done
                      ? "bg-beige text-darkgreen"
                      : "bg-fundal text-darkgreen hover:bg-darkgreen hover:text-white"
                  }`}
                >
                  {habit.done ? "Done" : "Mark Done"}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
