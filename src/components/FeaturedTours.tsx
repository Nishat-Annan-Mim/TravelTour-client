"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Tour } from "@/lib/types";
import TourCard from "./TourCard";
import TourCardSkeleton from "./TourCardSkeleton";
import Link from "next/link";

export default function FeaturedTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/tours?sort=rating&limit=4")
      .then((res) => setTours(res.data.tours))
      .catch(() => setTours([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-neutral">Featured Tours</h2>
            <p className="text-gray-500 mt-2">
              Our highest-rated travel experiences
            </p>
          </div>
          <Link
            href="/explore"
            className="text-primary font-medium text-sm hover:underline hidden sm:block"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <TourCardSkeleton key={i} />
              ))
            : tours.map((tour) => <TourCard key={tour._id} tour={tour} />)}
        </div>
      </div>
    </section>
  );
}
