const testimonials = [
  {
    name: "Ayesha Rahman",
    trip: "Kyoto Cultural Tour",
    quote:
      "Every detail was thoughtfully planned, and our guide's local knowledge made the trip unforgettable.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    trip: "Patagonia Hiking Trek",
    quote:
      "Booking was effortless and the itinerary balanced adventure with rest perfectly.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sofia Martins",
    trip: "Bali Beach Escape",
    quote:
      "From the villa to the sunset cruise, everything felt curated just for us.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-neutral">What Travelers Say</h2>
        <p className="text-gray-500 mt-2">Real experiences from real trips</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white border border-gray-100 rounded-2xl p-6"
          >
            <p className="text-gray-600 text-sm italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-5">
              <img
                src={t.image}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm text-neutral">{t.name}</p>
                <p className="text-xs text-gray-400">{t.trip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
