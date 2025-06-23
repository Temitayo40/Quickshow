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
  movie: string;
  showDateTime: Date;
  showPrice: number;
  occupiedSeats: string[];
}

// export interface DateTime {
//   '': [{ time: string; showId: string }];
// }
