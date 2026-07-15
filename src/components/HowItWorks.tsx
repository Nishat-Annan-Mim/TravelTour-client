import { Search, CalendarCheck, Luggage } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    desc: "Browse curated tours by destination, category, or budget.",
  },
  {
    icon: CalendarCheck,
    title: "Reserve",
    desc: "Pick your dates and reserve your spot in seconds.",
  },
  {
    icon: Luggage,
    title: "Travel",
    desc: "Pack your bags and enjoy a guided, unforgettable trip.",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-neutral">How TrailNest Works</h2>
        <p className="text-gray-500 mt-2">
          Three simple steps to your next adventure
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="flex flex-col items-center text-center bg-white rounded-2xl border border-gray-100 p-8"
          >
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <step.icon className="text-primary" size={28} />
            </div>
            <span className="text-xs font-semibold text-secondary">
              STEP {i + 1}
            </span>
            <h3 className="font-semibold text-lg text-neutral mt-1">
              {step.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
