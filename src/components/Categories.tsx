import {
  Mountain,
  Landmark,
  Waves,
  TreePine,
  PawPrint,
  Building2,
} from "lucide-react";

const categories = [
  { name: "Adventure", icon: Mountain, count: "40+ tours" },
  { name: "Cultural", icon: Landmark, count: "35+ tours" },
  { name: "Beach", icon: Waves, count: "28+ tours" },
  { name: "Hiking", icon: TreePine, count: "32+ tours" },
  { name: "Wildlife", icon: PawPrint, count: "20+ tours" },
  { name: "City Tour", icon: Building2, count: "25+ tours" },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-neutral">Browse by Category</h2>
        <p className="text-gray-500 mt-2">
          Find the kind of experience that fits your travel style
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <a
              key={cat.name}
              href={`/explore?category=${cat.name}`}
              className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-primary/30 transition"
            >
              <Icon className="text-primary" size={28} />
              <span className="font-medium text-sm text-neutral">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400">{cat.count}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
