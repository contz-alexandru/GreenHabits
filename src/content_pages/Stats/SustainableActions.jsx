export default function SustainableActions({tab}){
    return (
        <div className="flex-1 bg-bigbox rounded-2xl shadow-md py-4 px-6 border border-smallbox box-animated"
            style={{ background: "var(--color-bigbox)", color: "var(--color-darkgreen)", borderColor: "var(--color-smallbox)" }}>
            <h3 className="text-lg font-bold mb-3">Sustainable actions this month</h3>
            <ul className="space-y-2">
              {tab.map(act => (
                <li key={act.name}
                  className="flex justify-between items-center rounded-lg bg-earth px-3 py-2"
                  style={{ background: "var(--color-earth)", color: "var(--color-darkgreen)" }}>
                  <span>
                    {act.name} {act.count > 1 ? `x${act.count}` : ""}
                  </span>
                  <span className="text-sm font-semibold" style={{ minWidth: '60px', textAlign: 'right' }}>
                    {act.impact} kg CO₂
                  </span>
                </li>
              ))}
            </ul>
          </div>
    )
}