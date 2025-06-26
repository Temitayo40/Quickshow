import { Types } from 'mongoose';

export interface ShowBody {
  movieId: string;
  showsInput: [
    {
      date: string;
      time: string[];
    },
  ];
  showPrice: number;
}
export interface ShowsInput {
  date: string;
  time: string[];
}

export interface ShowsToCreate {
  movie: Types.ObjectId;
  showDateTime: Date;
  showPrice: number;
  occupiedSeats: Record<string, any>;
}
