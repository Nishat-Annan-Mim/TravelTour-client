export default function AboutPage() {
  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <h1 className="text-3xl font-bold text-neutral mb-4">About TrailNest</h1>
      <p className="text-gray-600 leading-relaxed mb-4">
        TrailNest started with a simple idea: travel planning should feel like
        discovery, not admin work. We connect independent tour organizers with
        travelers looking for curated, guided experiences — from mountain treks
        to cultural city walks.
      </p>
      <p className="text-gray-600 leading-relaxed mb-8">
        Every tour on our platform is listed by a real organizer and reviewed by
        real travelers, so you always know what to expect before you reserve
        your spot.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Founded", value: "2024" },
          { label: "Destinations", value: "45+" },
          { label: "Happy Travelers", value: "12,400+" },
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
