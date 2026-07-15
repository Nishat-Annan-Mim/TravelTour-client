import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white">
          Ready for Your Next Adventure?
        </h2>
        <p className="text-white/90 mt-2">
          Browse over 180 curated tours across 45+ destinations.
        </p>
        <Link
          href="/explore"
          className="inline-block mt-6 bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
        >
          Start Exploring
        </Link>
      </div>
    </section>
  );
}
