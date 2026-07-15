"use client";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { Tour } from "@/lib/types";
import TourCard from "@/components/TourCard";
import TourCardSkeleton from "@/components/TourCardSkeleton";
import { Search, SlidersHorizontal } from "lucide-react";

const categories = ["all", "Adventure", "Cultural", "Beach", "Hiking", "Wildlife", "City Tour"];

export default function ExplorePage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const fetchTours = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/tours", {
        params: {
          search: search || undefined,
          category: category !== "all" ? category : undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          minRating: minRating || undefined,
          sort,
          page,
          limit: 8,
        },
      });
      setTours(res.data.tours);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setTours([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, minPrice, maxPrice, minRating, sort, page]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTours();
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral">Explore Tours</h1>
        <p className="text-gray-500 mt-1">Find your next adventure from our curated catalog</p>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tour name or location..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-50 sm:w-auto"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
        <button type="submit" className="bg-primary text-white font-medium rounded-lg px-6 py-2.5 hover:opacity-90">
          Search
        </button>
      </form>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-gray-50 rounded-xl p-5 mb-8">
          <div>
            <label className="text-xs font-medium text-gray-500">Category</label>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
              placeholder="$0"
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
              placeholder="$5000"
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Min Rating</label>
            <select
              value={minRating}
              onChange={(e) => { setMinRating(e.target.value); setPage(1); }}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Any Rating</option>
              <option value="4">4★ & up</option>
              <option value="3">3★ & up</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="date">Departure Date</option>
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <TourCardSkeleton key={i} />)
          : tours.map((tour) => <TourCard key={tour._id} tour={tour} />)}
      </div>

      {!loading && tours.length === 0 && (
        <p className="text-center text-gray-500 py-16">No tours match your search. Try adjusting your filters.</p>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-medium ${
                page === i + 1 ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}