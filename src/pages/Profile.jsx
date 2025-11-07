import { useEffect, useState } from "react";
import { db } from "../firebase/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
 const { user } = useAuth(); // user-ul logat
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("Nu există date pentru acest utilizator!");
        }
      } catch (error) {
        console.error("Eroare la citirea datelor din Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10 text-darkgreen">Se încarcă profilul...</div>;
  }

  if (!userData) {
    return <div className="text-center mt-10 text-red-600">Nu s-au găsit datele utilizatorului.</div>;
  }

  return (
    <div className="p-6 text-darkgreen">
      <h1 className="text-3xl font-bold mb-4">Profilul tău</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Puncte:</strong> {userData.points}</p>
      <p><strong>Habits completate:</strong> {userData.completedHabits?.length || 0}</p>
    </div>
  );
}