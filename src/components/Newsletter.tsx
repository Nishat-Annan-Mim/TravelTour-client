"use client";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <Mail className="text-primary mx-auto mb-4" size={32} />
      <h2 className="text-2xl font-bold text-neutral">
        Get Travel Inspiration in Your Inbox
      </h2>
      <p className="text-gray-500 mt-2">
        New destinations and tour drops, once a month. No spam.
      </p>

      {submitted ? (
        <p className="text-primary font-medium mt-6">
          Thanks — you&apos;re on the list! 🎉
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-primary text-white font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition">
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
