"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Tour, Review } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import TourCard from "@/components/TourCard";
import { MapPin, Calendar, Users, Star, Clock } from "lucide-react";

export default function TourDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [tour, setTour] = useState<Tour | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Tour[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bookingMsg, setBookingMsg] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");

  const loadData = async () => {
    try {
      const [tourRes, reviewsRes, relatedRes] = await Promise.all([
        api.get(`/tours/${id}`),
        api.get(`/reviews/tour/${id}`),
        api.get(`/tours/${id}/related`),
      ]);
      setTour(tourRes.data.tour);
      setReviews(reviewsRes.data.reviews);
      setRelated(relatedRes.data.tours);
    } catch {
      setTour(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleReserve = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setBookingMsg("");
    try {
      await api.post("/bookings", { tourId: id, guests });
      setBookingMsg("Spot reserved! Check My Bookings for details.");
    } catch (err: any) {
      setBookingMsg(
        err.response?.data?.message || "Could not reserve. Please try again.",
      );
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    setReviewMsg("");
    try {
      await api.post("/reviews", {
        tourId: id,
        rating: reviewRating,
        comment: reviewComment,
      });
      setReviewComment("");
      setReviewRating(5);
      loadData();
    } catch (err: any) {
      setReviewMsg(err.response?.data?.message || "Could not submit review.");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        Loading tour...
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="flex-1 max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        Tour not found.
      </div>
    );
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <div className="mb-8">
        <div className="h-80 sm:h-[420px] rounded-2xl overflow-hidden">
          <img
            src={tour.images[activeImage]}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        </div>
        {tour.images.length > 1 && (
          <div className="flex gap-3 mt-3 overflow-x-auto">
            {tour.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                  activeImage === i ? "border-primary" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <span className="text-xs font-semibold text-secondary uppercase">
              {tour.category}
            </span>
            <h1 className="text-3xl font-bold text-neutral mt-1">
              {tour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-3">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {tour.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} />{" "}
                {new Date(tour.departureDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} /> {tour.duration}
              </span>
              <span className="flex items-center gap-1">
                <Star size={16} className="fill-secondary text-secondary" />{" "}
                {tour.avgRating.toFixed(1)} ({tour.numReviews} reviews)
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral mb-3">
              Overview
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {tour.fullDescription}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral mb-3">
              Key Information
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Price per person", value: `$${tour.price}` },
                { label: "Duration", value: tour.duration },
                { label: "Max Guests", value: tour.maxGuests },
                {
                  label: "Organizer",
                  value: tour.organizer?.name || "TrailNest",
                },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="font-semibold text-neutral mt-1">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral mb-3">
              Reviews ({reviews.length})
            </h2>

            <form
              onSubmit={handleReviewSubmit}
              className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Your rating:</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setReviewRating(n)}
                  >
                    <Star
                      size={20}
                      className={
                        n <= reviewRating
                          ? "fill-secondary text-secondary"
                          : "text-gray-300"
                      }
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                required
                placeholder="Share your experience on this tour..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-[80px]"
              />
              {reviewMsg && <p className="text-sm text-red-500">{reviewMsg}</p>}
              <button className="bg-primary text-white text-sm font-medium px-5 py-2 rounded-lg hover:opacity-90">
                Submit Review
              </button>
            </form>

            <div className="space-y-4">
              {reviews.length === 0 && (
                <p className="text-sm text-gray-400">
                  No reviews yet. Be the first to share your experience.
                </p>
              )}
              {reviews.map((r) => (
                <div
                  key={r._id}
                  className="border border-gray-100 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-neutral">
                      {r.user.name}
                    </span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < r.rating
                              ? "fill-secondary text-secondary"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-2xl font-bold text-primary">
              ${tour.price}{" "}
              <span className="text-sm text-gray-400 font-normal">
                / person
              </span>
            </p>

            <div className="mt-4">
              <label className="text-xs font-medium text-gray-500 flex items-center gap-1">
                <Users size={14} /> Guests
              </label>
              <input
                type="number"
                min={1}
                max={tour.maxGuests}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                Max {tour.maxGuests} guests
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-gray-500">Total</span>
              <span className="font-semibold text-neutral">
                ${tour.price * guests}
              </span>
            </div>

            <button
              onClick={handleReserve}
              className="w-full mt-5 bg-primary text-white font-medium py-3 rounded-lg hover:opacity-90 transition"
            >
              Reserve Spot
            </button>
            {bookingMsg && (
              <p className="text-sm text-center mt-3 text-primary">
                {bookingMsg}
              </p>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-neutral mb-6">
            Related Tours
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((t) => (
              <TourCard key={t._id} tour={t} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
