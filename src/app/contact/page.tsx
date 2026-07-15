"use client";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <h1 className="text-3xl font-bold text-neutral mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">
        Questions about a tour or your account? We&apos;re happy to help.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-5">
          <Mail className="text-primary" size={20} />
          <span className="text-sm text-gray-600">support@trailnest.com</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-5">
          <Phone className="text-primary" size={20} />
          <span className="text-sm text-gray-600">+880 1234 567890</span>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-5">
          <MapPin className="text-primary" size={20} />
          <span className="text-sm text-gray-600">Dhaka, Bangladesh</span>
        </div>
      </div>

      {sent ? (
        <p className="text-primary font-medium">
          Thanks for reaching out — we&apos;ll reply within 24 hours.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white border border-gray-100 rounded-2xl p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              placeholder="Your name"
              className="border border-gray-300 rounded-lg px-3 py-2.5"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              className="border border-gray-300 rounded-lg px-3 py-2.5"
            />
          </div>
          <textarea
            required
            placeholder="Your message"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 min-h-[120px]"
          />
          <button className="bg-primary text-white font-medium px-6 py-2.5 rounded-lg hover:opacity-90">
            Send Message
          </button>
        </form>
      )}
    </main>
  );
}
