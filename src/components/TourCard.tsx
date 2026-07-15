import Link from "next/link";
import { MapPin, Star, Calendar } from "lucide-react";
import { Tour } from "@/lib/types";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/tours/${tour._id}`}
      className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition h-full"
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={tour.images[0]}
          alt={tour.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <span className="text-xs font-semibold text-secondary uppercase">
          {tour.category}
        </span>
        <h3 className="font-semibold text-neutral mt-1 line-clamp-1">
          {tour.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">
          {tour.shortDescription}
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-500 mt-3">
          <MapPin size={14} /> {tour.location}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
          <Calendar size={14} />{" "}
          {new Date(tour.departureDate).toLocaleDateString()}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm">
            <Star size={16} className="fill-secondary text-secondary" />
            <span className="font-medium">{tour.avgRating.toFixed(1)}</span>
            <span className="text-gray-400">({tour.numReviews})</span>
          </div>
          <span className="font-bold text-primary">${tour.price}</span>
        </div>

        <span className="mt-3 w-full text-center bg-primary text-white text-sm font-medium py-2 rounded-lg hover:opacity-90 transition">
          View Details
        </span>
      </div>
    </Link>
  );
}
