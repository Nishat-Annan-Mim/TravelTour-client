"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { Tour } from "@/lib/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { Eye, Trash2 } from "lucide-react";

function ManageToursContent() {
  const { user } = useAuth();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tours/my/listings");
      setTours(res.data.tours);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tour? This cannot be undone.")) return;
    await api.delete(`/tours/${id}`);
    setTours((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <h1 className="text-3xl font-bold text-neutral mb-1">
        {user?.role === "admin" ? "Manage All Tours" : "My Tours"}
      </h1>
      <p className="text-gray-500 mb-8">
        {user?.role === "admin"
          ? "Admin view — every tour on TrailNest"
          : "Tours you've listed on TrailNest"}
      </p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : tours.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          You haven&apos;t listed any tours yet.{" "}
          <Link
            href="/items/add"
            className="text-primary font-medium hover:underline"
          >
            Add one now
          </Link>
          .
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-100 rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3">Tour</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Departure</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr
                  key={tour._id}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="px-5 py-3 flex items-center gap-3">
                    <img
                      src={tour.images[0]}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium text-neutral line-clamp-1">
                      {tour.title}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{tour.category}</td>
                  <td className="px-5 py-3 text-gray-600">${tour.price}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {new Date(tour.departureDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    {tour.avgRating.toFixed(1)} ★
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/tours/${tour._id}`}
                        className="text-primary hover:opacity-70"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(tour._id)}
                        className="text-red-500 hover:opacity-70"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default function ManageToursPage() {
  return (
    <ProtectedRoute>
      <ManageToursContent />
    </ProtectedRoute>
  );
}
