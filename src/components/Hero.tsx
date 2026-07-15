"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600",
    title: "Hike the World's Wildest Trails",
    subtitle:
      "Guided adventure tours through mountains, forests, and coastlines",
  },
  {
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600",
    title: "Discover Ancient Cultures",
    subtitle: "Immersive cultural tours led by local experts",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600",
    title: "Escape to Pristine Beaches",
    subtitle: "Relaxing beach getaways curated by TrailNest",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[index].image})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          key={slides[index].title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold text-white max-w-3xl"
        >
          {slides[index].title}
        </motion.h1>
        <motion.p
          key={slides[index].subtitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/90 mt-4 max-w-xl"
        >
          {slides[index].subtitle}
        </motion.p>

        <div className="mt-8 bg-white rounded-full flex items-center gap-2 px-2 py-2 w-full max-w-md shadow-lg">
          <Search className="text-gray-400 ml-2" size={20} />
          <input
            type="text"
            placeholder="Search destinations..."
            className="flex-1 outline-none text-sm py-1.5"
          />
          <Link
            href="/explore"
            className="bg-primary text-white text-sm font-medium px-5 py-2 rounded-full hover:opacity-90 transition"
          >
            Explore
          </Link>
        </div>

        <div className="flex gap-2 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
