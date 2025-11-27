import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

export default function EcoStreakChar({format,displayedMonth,weeklyData,percentDiff}){
    return (
        <section
          className="bg-bigbox rounded-2xl shadow-md p-4 sm:p-7 border-t box-animated"
          style={{
            backgroundColor: "var(--color-bigbox)",
            borderColor: "var(--color-earth)",
            borderWidth: 2,
            boxSizing: "border-box",
            maxWidth: "100rem",
            width: "70%",
          }}>
          <div>
            <div className="flex flex-col items-center justify-between mb-3">
              <h3
                className="text-xl sm:text-2xl font-bold text-darkgreen mb-1"
                style={{ color: "var(--color-darkgreen)" }}
              >
                Weekly Eco Actions
              </h3>
              <div
                className="font-bold text-xl"
                style={{
                  color: "#22692f",
                  marginBottom: "10px",
                  marginTop: "0.1rem",
                  letterSpacing: '0.02em'
                }}
              >
                {format(displayedMonth, "MMMM yyyy")}
              </div>
            </div>
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 12, right: 8, left: 8, bottom: 6 }}
                  barGap={8}
                  barCategoryGap="30%"
                >
                  <CartesianGrid
                    stroke="var(--color-earth)"
                    strokeDasharray="2 0"
                  />
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "var(--color-darkgreen)", fontWeight: 700 }}
                  />
                  <YAxis
                    tick={{ fill: "var(--color-darkgreen)", fontWeight: 700 }}
                    allowDecimals={false}
                    axisLine={{ stroke: "var(--color-earth)" }}
                    tickLine={{ stroke: "var(--color-earth)" }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.04)" }}
                    contentStyle={{
                      backgroundColor: "var(--color-bigbox)",
                      borderRadius: "8px",
                      border: "2px solid var(--color-earth)",
                      color: "var(--color-darkgreen)",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="actions"
                    name="Eco Actions"
                    fill="var(--color-earth)"
                    stroke="var(--color-darkgreen)"
                    strokeWidth={3}
                    radius={[10, 10, 6, 6]}
                    barSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="font-semibold mt-5 ml-2 text-[1.08rem] text-center"
              style={{ color: (percentDiff >= 0 ? "#1f7d2c" : "#b71c1c") }}>
              {percentDiff >= 0
                ? `+${percentDiff}% compared to last month`
                : `${percentDiff}% compared to last month`}
            </div>
          </div>
        </section>
    )
}