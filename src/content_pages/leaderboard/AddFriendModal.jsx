// src/content_pages/leaderboard/AddFriendModal.jsx
// Modal pentru adăugare prieten

export default function AddFriendModal({ showModal, closeModal, newFriend, setNewFriend, handleAddFriend }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50" style={{ background: "transparent" }}>
      <form
        onSubmit={handleAddFriend}
        className="bg-bigbox rounded-2xl shadow-lg p-6 border border-smallbox w-full max-w-md"
        style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}
      >
        <h3 className="text-lg font-bold mb-3 text-darkgreen">Add a new friend</h3>
        <input
          className="w-full p-2 rounded border border-darkgreen mb-4"
          style={{ color: "var(--color-darkgreen)", borderColor: "var(--color-darkgreen)" }}
          type="text"
          autoFocus
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
          placeholder="Enter friend's name"
          required
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="px-4 py-2 rounded font-semibold border border-darkgreen bg-beige text-darkgreen"
            style={{ backgroundColor: "var(--color-beige)", borderColor: "var(--color-darkgreen)" }}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded font-semibold border border-darkgreen"
            style={{ backgroundColor: "var(--color-darkgreen)", color: "var(--color-fundal)", borderColor: "var(--color-darkgreen)" }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
