"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Booking } from "@/lib/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MapPin, Calendar, Users } from "lucide-react";

function MyBookingsContent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/bookings/my");
      setBookings(res.data.bookings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm("Cancel this booking?")) return;
    await api.delete(`/bookings/${id}`);
    load();
  };

  return (
    <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <h1 className="text-3xl font-bold text-neutral mb-1">My Bookings</h1>
      <p className="text-gray-500 mb-8">Tours you&apos;ve reserved a spot on</p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 rounded-2xl p-4"
            >
              <img
                src={b.tour.images[0]}
                alt=""
                className="w-full sm:w-40 h-32 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral">{b.tour.title}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      b.status === "confirmed"
                        ? "bg-primary/10 text-primary"
                        : b.status === "cancelled"
                          ? "bg-red-50 text-red-500"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {b.tour.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />{" "}
                    {new Date(b.tour.departureDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {b.guests} guest(s)
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-primary">
                    ${b.totalPrice}
                  </span>
                  {b.status === "confirmed" && (
                    <button
                      onClick={() => handleCancel(b._id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function MyBookingsPage() {
  return (
    <ProtectedRoute>
      <MyBookingsContent />
    </ProtectedRoute>
  );
}
