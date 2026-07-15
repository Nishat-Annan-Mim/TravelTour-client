"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I reserve a spot on a tour?",
    a: "Create an account, open any tour's details page, choose your number of guests, and click Reserve Spot. Your booking is confirmed instantly.",
  },
  {
    q: "Do I need to pay online to book?",
    a: "No. TrailNest reserves your spot directly — payment for your trip is arranged with the organizer at a later stage, not through the platform.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes, go to My Bookings and cancel any upcoming reservation before the departure date.",
  },
  {
    q: "Can I list my own tour?",
    a: "Yes. Once logged in, go to Add Tour to create a listing that appears publicly on the Explore page.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-neutral">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-neutral text-sm">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <p className="px-5 pb-4 text-sm text-gray-500">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
