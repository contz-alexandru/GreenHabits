import { useState } from "react";

const categories = [
  "Tools",
  "Kitchen",
  "Electronics",
  "Garden",
  "Sports",
  "Other",
];

const requestsInit = [
  {
    id: 1,
    item: "Cordless Drill",
    category: "Tools",
    requester: "Maria P.",
    date: "2025-11-10",
    time: "16:00",
    details: "Need for assembling a bookshelf.",
  },
  {
    id: 2,
    item: "Vacuum Cleaner",
    category: "Household",
    requester: "Alex C.",
    date: "2025-11-14",
    time: "09:00",
    details: "Moving out, only for one morning.",
  },
];

export default function Rent() {
  const [form, setForm] = useState({
    category: "",
    item: "",
    date: "",
    time: "",
    details: "",
  });
  const [requests, setRequests] = useState(requestsInit);
  const [respondingRequestId, setRespondingRequestId] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [respondedInfo, setRespondedInfo] = useState({});
  const [seeMessageId, setSeeMessageId] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setRequests([
      ...requests,
      {
        ...form,
        id: Date.now(),
        requester: "You",
      },
    ]);
    setForm({ category: "", item: "", date: "", time: "", details: "" });
  }
  function handleRespond(requestId) {
    setRespondingRequestId(requestId);
    setResponseMessage("");
  }
  function handleSendResponse() {
    const reqIdx = requests.findIndex(r => r.id === respondingRequestId);
    if (reqIdx !== -1) {
      if (requests[reqIdx].requester === "You") {
        setRespondedInfo({
          ...respondedInfo,
          [respondingRequestId]: {
            message: responseMessage,
            responder: "You"
          }
        });
      }
      setRespondingRequestId(null);
      setResponseMessage("");
    }
  }
  function closeModal() {
    setRespondingRequestId(null);
    setResponseMessage("");
    setSeeMessageId(null);
  }

  return (
    <main className="min-h-screen bg-fundal py-10 px-2 sm:px-8" style={{ backgroundColor: "var(--color-fundal)" }}>
      {/* Respond Modal */}
      {respondingRequestId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 backdrop-blur-md bg-black/40 transition-all"
            onClick={closeModal}
          />
          <div className="relative bg-bigbox rounded-3xl border border-smallbox p-7 shadow-2xl z-50 w-[95vw] max-w-md mx-auto"
            style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}>
            <h3 className="text-darkgreen text-2xl font-extrabold mb-5" style={{ color: "var(--color-darkgreen)" }}>
              Respond to Request
            </h3>
            <label className="block text-darkgreen text-base font-semibold mb-3" htmlFor="responseMsg">
              Message the requester (when and where to meet):
            </label>
            <textarea
              id="responseMsg"
              className="w-full min-h-[70px] p-3 rounded-xl border border-smallbox bg-earth"
              style={{ backgroundColor: "var(--color-earth)", borderColor: "var(--color-smallbox)", color: "var(--color-darkgreen)" }}
              value={responseMessage}
              onChange={e => setResponseMessage(e.target.value)}
              placeholder="e.g., Let's meet tomorrow at 15:00, Park Entrance."
            />
            <div className="mt-6 flex justify-end gap-4">
              <button onClick={closeModal}
                className="px-6 py-2 rounded-xl font-bold bg-earth border border-smallbox text-darkgreen shadow"
                style={{ backgroundColor: "var(--color-earth)", color: "var(--color-darkgreen)", borderColor: "var(--color-smallbox)" }}>
                Cancel
              </button>
              <button onClick={handleSendResponse}
                className="px-6 py-2 rounded-xl font-bold shadow"
                style={{
                  backgroundColor: "var(--color-smallbox)", // Mint
                  color: "var(--color-darkgreen)",
                  borderColor: "var(--color-earth)"
                }}
                disabled={!responseMessage.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* See Message Modal */}
      {seeMessageId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 backdrop-blur-md bg-black/40 transition-all"
            onClick={closeModal}
          />
          <div className="relative bg-bigbox rounded-3xl border border-smallbox p-7 shadow-2xl z-50 w-[95vw] max-w-md mx-auto"
            style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}>
            <h3 className="text-darkgreen text-2xl font-extrabold mb-5" style={{ color: "var(--color-darkgreen)" }}>
              Response Details
            </h3>
            <p className="mb-5">
              <span className="font-semibold text-darkgreen">Message:</span>
              <br />
              <span className="text-lg ml-2">{respondedInfo[seeMessageId]?.message || ""}</span>
            </p>
            <div className="mb-7">
              <span className="font-semibold text-darkgreen">From:</span>
              <span className="ml-2 text-lg">{respondedInfo[seeMessageId]?.responder || "Unknown"}</span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-xl font-bold bg-earth border border-smallbox text-darkgreen shadow"
                style={{ backgroundColor: "var(--color-earth)", color: "var(--color-darkgreen)", borderColor: "var(--color-smallbox)" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold text-center text-darkgreen mb-12 tracking-tight" style={{ color: "var(--color-darkgreen)" }}>
          Borrow & Lend
        </h1>

        {/* Request Form Card */}
        <section
          className="mb-12 bg-bigbox rounded-3xl shadow-xl p-7 border border-smallbox box-animated"
          style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}>
          <h2 className="text-xl font-bold mb-6 text-darkgreen text-center" style={{ color: "var(--color-darkgreen)" }}>Request an Item</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-1 text-darkgreen font-semibold text-sm" htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className="rounded-xl bg-earth border border-smallbox px-3 py-2 w-full"
                style={{
                  backgroundColor: "var(--color-earth)",
                  color: "var(--color-darkgreen)",
                  borderColor: "var(--color-smallbox)",
                }}
                required
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Choose</option>
                {categories.map(cat => (
                  <option value={cat} key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-darkgreen font-semibold text-sm" htmlFor="item">Item</label>
              <input
                type="text"
                id="item"
                name="item"
                required
                placeholder="e.g. power drill"
                className="rounded-xl bg-earth border border-smallbox px-3 py-2 w-full"
                style={{
                  backgroundColor: "var(--color-earth)",
                  color: "var(--color-darkgreen)",
                  borderColor: "var(--color-smallbox)",
                }}
                value={form.item}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 text-darkgreen font-semibold text-sm" htmlFor="date">Date needed</label>
              <input
                type="date"
                id="date"
                name="date"
                required
                className="rounded-xl bg-earth border border-smallbox px-3 py-2 w-full"
                style={{
                  backgroundColor: "var(--color-earth)",
                  color: "var(--color-darkgreen)",
                  borderColor: "var(--color-smallbox)",
                }}
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 text-darkgreen font-semibold text-sm" htmlFor="time">Time needed</label>
              <input
                type="time"
                id="time"
                name="time"
                required
                className="rounded-xl bg-earth border border-smallbox px-3 py-2 w-full"
                style={{
                  backgroundColor: "var(--color-earth)",
                  color: "var(--color-darkgreen)",
                  borderColor: "var(--color-smallbox)",
                }}
                value={form.time}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-darkgreen font-semibold text-sm" htmlFor="details">Details</label>
              <input
                type="text"
                id="details"
                name="details"
                placeholder="Optional notes"
                className="rounded-xl bg-earth border border-smallbox px-3 py-2 w-full"
                style={{
                  backgroundColor: "var(--color-earth)",
                  color: "var(--color-darkgreen)",
                  borderColor: "var(--color-smallbox)",
                }}
                value={form.details}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 md:col-span-3 flex justify-center mt-3">
              <button
                type="submit"
                className="earth-animated-btn px-8 py-2 font-bold rounded-xl shadow"
                style={{
                  backgroundColor: "var(--color-earth)",
                  color: "var(--color-darkgreen)",
                  borderColor: "var(--color-earth)",
                  minWidth: "170px"
                }}>
                Submit Request
              </button>
            </div>
          </form>
        </section>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Card: Active Requests */}
          <section
            className="md:col-span-2 bg-bigbox rounded-3xl shadow-xl p-7 border border-smallbox box-animated flex flex-col"
            style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)", minHeight: 330 }}>
            <h3 className="text-lg font-bold mb-5 text-darkgreen" style={{ color: "var(--color-darkgreen)" }}>
              Active Requests
            </h3>
            <div className="flex flex-col gap-5">
              {requests.length === 0 && (
                <div className="text-darkgreen text-base">No requests yet! Be the first to post one.</div>
              )}
              {requests.map(req => (
                <div
                  key={req.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-4 py-3 rounded-xl bg-earth border border-smallbox shadow-sm"
                  style={{ backgroundColor: "var(--color-earth)", borderColor: "var(--color-smallbox)", color: "var(--color-darkgreen)" }}>
                  <div>
                    <div className="font-extrabold">
                      <span className="text-base">{req.item}</span>
                      <span className="ml-2 text-xs px-2 py-0.5 rounded bg-bigbox font-semibold" style={{ backgroundColor: "var(--color-bigbox)" }}>{req.category}</span>
                    </div>
                    <div className="text-sm mt-1">Requested by <span className="font-bold">{req.requester}</span></div>
                    <div className="text-xs mt-1 text-emerald-900">
                      {req.date} at {req.time} · {req.details}
                    </div>
                  </div>
                  <button
                    className={`mt-2 sm:mt-0 px-5 py-2 rounded-xl text-base font-bold shadow transition ${
                      req.requester === "You" && respondedInfo[req.id] ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    style={{
                      backgroundColor: "var(--color-smallbox)", // Mint
                      color: "var(--color-darkgreen)",
                      border: "2px solid var(--color-earth)"
                    }}
                    disabled={req.requester === "You" && respondedInfo[req.id]}
                    onClick={() => handleRespond(req.id)}
                  >
                    {req.requester === "You"
                      ? respondedInfo[req.id] ? "Responded" : "Respond"
                      : "Respond"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Small Card: Tips & Etiquette */}
          <section
            className="bg-bigbox rounded-3xl shadow-xl p-7 border border-smallbox box-animated flex flex-col gap-2"
            style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)", minHeight: 180 }}>
            <h3 className="text-lg font-bold text-darkgreen mb-1" style={{ color: "var(--color-darkgreen)" }}>Borrowing Tips</h3>
            <ul className="list-disc ml-4 text-sm text-darkgreen" style={{ color: "var(--color-darkgreen)" }}>
              <li>Specify exactly what you need and when.</li>
              <li>Be prompt returning borrowed items.</li>
              <li>Respect others' property and wishes.</li>
              <li>Ask about item condition before borrowing.</li>
              <li>Offer gratitude—a simple thank you goes a long way!</li>
              <li>Clean items before returning.</li>
              <li>Notify if late or plans change.</li>
              <li>Share positive feedback after borrowing.</li>
              <li>Always communicate clearly for smooth exchanges.</li>
              <li>Don’t lend or borrow items against owner's wishes.</li>
            </ul>
          </section>
        </div>

        {/* Bottom Card: My Requests */}
        <section
          className="mt-16 bg-bigbox rounded-3xl shadow-xl p-7 border border-smallbox box-animated"
          style={{ backgroundColor: "var(--color-bigbox)", borderColor: "var(--color-smallbox)" }}>
          <h3 className="text-lg font-bold text-darkgreen mb-5" style={{ color: "var(--color-darkgreen)" }}>Your Requests</h3>
          <ul className="space-y-5">
            {requests.filter(r => r.requester === "You").length === 0
              ? <li className="text-darkgreen">You haven't made any requests yet!</li>
              : requests.filter(r => r.requester === "You").map(req => (
                <li
                  key={req.id}
                  className="p-4 rounded-xl bg-earth flex flex-col sm:flex-row justify-between border border-smallbox shadow-sm"
                  style={{ backgroundColor: "var(--color-earth)", borderColor: "var(--color-smallbox)", color: "var(--color-darkgreen)" }}>
                  <div>
                    <span className="font-extrabold">{req.item}</span>
                    <span className="ml-3 text-xs px-2 py-0.5 rounded bg-bigbox font-semibold" style={{ backgroundColor: "var(--color-bigbox)" }}>{req.category}</span>
                  </div>
                  <div className="flex mt-1 gap-3 items-center">
                    <span className="text-xs">{req.date} at {req.time} · {req.details}</span>
                    {respondedInfo[req.id] && (
                      <>
                        <span className="ml-1 px-2 py-1 rounded bg-beige text-xs font-semibold" style={{ backgroundColor: "var(--color-beige)", color: "var(--color-darkgreen)" }}>
                          Responded
                        </span>
                        <button
                          className="ml-2 px-4 py-1 rounded-xl bg-bigbox text-darkgreen text-xs font-bold border border-smallbox hover:bg-smallbox transition"
                          style={{ backgroundColor: "var(--color-bigbox)", color: "var(--color-darkgreen)", borderColor: "var(--color-smallbox)" }}
                          onClick={() => setSeeMessageId(req.id)}
                        >
                          See Message
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
