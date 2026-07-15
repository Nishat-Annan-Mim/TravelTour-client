import Link from "next/link";
import {
  Compass,
  Globe,
  MessageCircle,
  Send,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <Compass className="text-primary" size={22} /> TrailNest
          </div>
          <p className="text-sm text-gray-400">
            Discover and reserve curated travel experiences around the world.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <Globe size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <Send size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/explore" className="hover:text-primary">
                All Tours
              </Link>
            </li>
            <li>
              <Link
                href="/explore?category=Adventure"
                className="hover:text-primary"
              >
                Adventure
              </Link>
            </li>
            <li>
              <Link
                href="/explore?category=Cultural"
                className="hover:text-primary"
              >
                Cultural
              </Link>
            </li>
            <li>
              <Link
                href="/explore?category=Beach"
                className="hover:text-primary"
              >
                Beach
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-primary">
                Help / FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Mail size={14} /> support@trailnest.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} /> +880 1234 567890
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TrailNest. All rights reserved.
      </div>
    </footer>
  );
}
