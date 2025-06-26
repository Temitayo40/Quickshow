export interface Trailer {
  image: string;
  videoUrl: string;
}

export interface CastMember {
  name: string;
  profile_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  name: string;
  profile_path: string;
}

export interface Show {
  _id: string;
  id: number;
  tmdbId: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: Genre[];
  casts: CastMember[];
  release_date: string; // ISO date string
  original_language: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
}

export interface ShowTime {
  time: string; // ISO string
  showId: string;
}

export type DateTimeData = {
  [date: string]: ShowTime[];
};

export interface ActiveShow {
  _id: string;
  movie: Show;
  showDateTime: string;
  showPrice: number;
  occupiedSeats: {
    [seatId: string]: string;
  };
  __v?: number;
}

export interface Dashboard {
  totalBookings: number;
  totalRevenue: number;
  totalUser: number;
  activeShows: ActiveShow[];
}

export interface BookingShow {
  _id: string;
  movie: Show;
  showDateTime: string;
  showPrice: number;
}

export interface BookingUser {
  name: string;
}

export interface Booking {
  _id: string;
  user: BookingUser;
  show: BookingShow;
  amount: number;
  bookedSeats: string[];
  isPaid: boolean;
}
