// src/pages/Leaderboard.jsx 

import { globalUsers } from "../content_pages/leaderboard/LeaderboardData";
import { useLeaderboardState, sortData } from "../content_pages/leaderboard/Hooks";
import SortControls from "../content_pages/leaderboard/SortControls";
import LeaderboardGlobal from "../content_pages/leaderboard/LeaderboardGlobal";
import LeaderboardFriends from "../content_pages/leaderboard/LeaderboardFriends";
import FriendsList from "../content_pages/leaderboard/FriendsList";
import AddFriendModal from "../content_pages/leaderboard/AddFriendModal";

export default function Leaderboard() {
  const fields = [
    { id: "points", label: "Tasks Completed" },
    { id: "co2", label: "CO₂ Saved (kg)" },
    { id: "streak", label: "Streak" }
  ];

  const {
    selectedField, setSelectedField,
    friendsList,
    showModal, setShowModal,
    newFriend, setNewFriend,
    handleAddFriend
  } = useLeaderboardState();

  const globalSorted = sortData(globalUsers, selectedField);
  const friendsSorted = sortData(friendsList, selectedField);

  return (
    <main className="min-h-screen p-4 md:p-8 relative z-10">
      {showModal && (
        <AddFriendModal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          newFriend={newFriend}
          setNewFriend={setNewFriend}
          handleAddFriend={handleAddFriend}
        />
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <LeaderboardGlobal users={globalSorted} selectedField={selectedField} />
        <div className="w-full md:w-1/2 flex flex-col h-full gap-6 min-w-[320px]">
          <LeaderboardFriends friends={friendsSorted} selectedField={selectedField} />
          <FriendsList
            friends={friendsList}
            selectedField={selectedField}
            onAddFriendClick={() => setShowModal(true)}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 px-4">
        <SortControls fields={fields} selectedField={selectedField} setSelectedField={setSelectedField} />
      </div>
    </main>
  );
}
