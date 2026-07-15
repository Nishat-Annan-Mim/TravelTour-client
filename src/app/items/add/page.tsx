"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

const categories = [
  "Adventure",
  "Cultural",
  "Beach",
  "Hiking",
  "Wildlife",
  "City Tour",
];

function AddTourForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    duration: "",
    departureDate: "",
    location: "",
    category: "Adventure",
    maxGuests: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/tours", {
        ...form,
        price: Number(form.price),
        maxGuests: Number(form.maxGuests),
        images: form.imageUrl ? [form.imageUrl] : [],
      });
      router.push("/items/manage");
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not create tour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <h1 className="text-3xl font-bold text-neutral mb-1">Add a New Tour</h1>
      <p className="text-gray-500 mb-8">
        List your travel experience for others to discover and reserve.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white border border-gray-100 rounded-2xl p-6"
      >
        <div>
          <label className="text-sm font-medium text-neutral">Title</label>
          <input
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2.5"
            placeholder="e.g. Sunrise Trek in the Swiss Alps"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-neutral">
            Short Description
          </label>
          <input
            name="shortDescription"
            required
            maxLength={200}
            value={form.shortDescription}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2.5"
            placeholder="One or two sentence summary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-neutral">
            Full Description
          </label>
          <textarea
            name="fullDescription"
            required
            value={form.fullDescription}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2.5 min-h-[120px]"
            placeholder="Detailed itinerary and what's included"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-neutral">
              Price ($ / person)
            </label>
            <input
              name="price"
              type="number"
              min={0}
              required
              value={form.price}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral">
              Max Guests
            </label>
            <input
              name="maxGuests"
              type="number"
              min={1}
              required
              value={form.maxGuests}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2.5"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-neutral">Duration</label>
            <input
              name="duration"
              required
              value={form.duration}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2.5"
              placeholder="e.g. 3 Days 2 Nights"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral">
              Departure Date
            </label>
            <input
              name="departureDate"
              type="date"
              required
              value={form.departureDate}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2.5"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-neutral">Location</label>
            <input
              name="location"
              required
              value={form.location}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2.5"
              placeholder="e.g. Interlaken, Switzerland"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2.5"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-neutral">
            Image URL (optional)
          </label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2.5"
            placeholder="https://..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Publishing..." : "Submit Tour"}
        </button>
      </form>
    </main>
  );
}

export default function AddTourPage() {
  return (
    <ProtectedRoute>
      <AddTourForm />
    </ProtectedRoute>
  );
}
