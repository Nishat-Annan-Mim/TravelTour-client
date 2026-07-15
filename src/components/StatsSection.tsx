"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

const stats = [
  { label: "Travelers Served", value: "12,400+" },
  { label: "Tours Listed", value: "180+" },
  { label: "Destinations", value: "45+" },
  { label: "Avg Rating", value: "4.8/5" },
];

const destinationData = [
  { name: "Bali", bookings: 320 },
  { name: "Kyoto", bookings: 280 },
  { name: "Swiss Alps", bookings: 240 },
  { name: "Patagonia", bookings: 190 },
  { name: "Marrakech", bookings: 160 },
];

export default function StatsSection() {
  return (
    <section className="bg-neutral py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h3 className="font-semibold text-neutral mb-4">
            Most Booked Destinations This Year
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={destinationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#0D9488" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
