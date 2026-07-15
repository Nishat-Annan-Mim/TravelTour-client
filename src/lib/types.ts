export interface Organizer {
  _id: string;
  name: string;
  email?: string;
  image?: string;
}

export interface Tour {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  duration: string;
  departureDate: string;
  location: string;
  category: string;
  images: string[];
  maxGuests: number;
  avgRating: number;
  numReviews: number;
  organizer: Organizer;
  createdAt: string;
}

export interface Review {
  _id: string;
  tour: string;
  user: { _id: string; name: string; image?: string };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  _id: string;
  tour: Tour;
  guests: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}
