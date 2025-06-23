export interface Artist {
  id: number;
  name: string;
  category: string[];
  priceRange: string;
  location: string;
  bio: string;
  languages: string[];
  image: string;
  rating: number;
  totalBookings: number;
}

export interface Submission {
  id: number;
  name: string;
  category: string[];
  city: string;
  feeRange: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'review' | 'rejected';
}

export interface FilterOptions {
  category: string;
  location: string;
  priceRange: string;
}

export interface ArtistFormData {
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  feeRange: string;
  location: string;
  profileImage?: File;
}