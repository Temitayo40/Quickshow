import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schema/user.schema';
import { ShowsInput, ShowsToCreate } from './schema/show.interface';
import { ShowDocument } from './schema/show.schema';
@Injectable()
export class ShowsService {
  constructor(
    @InjectModel('Show')
    private movieModel: Model<UserDocument>,
    private showModel: Model<ShowDocument>,
  ) {}

  // to get nowPlayingMovies
  async getNowPlayingMovies(): Promise<any[]> {
    try {
      const { data } = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing',
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        },
      );
      return data.results;
    } catch (error) {
      throw new RpcException('Failed to fetch now playing movies');
    }
  }

  async addShow(movieId: string, showsInput: ShowsInput[], showPrice: number) {
    let movie = await this.movieModel.findById(movieId);
    if (!movie) {
      const [movieDetailResponse, movieCreditResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }),
      ]);

      const movieApidata: any = movieDetailResponse.data;
      const movieCreditData: any = movieCreditResponse.data;

      const movieDetails: any = {
        _id: movieId,
        title: movieApidata.title,
        overview: movieApidata.overview,
        poster_path: movieApidata.poster_path,
        backdrop_path: movieApidata.backdrop_path,
        genres: movieApidata.genres,
        // casts: movieApidata.casts,
        casts: movieApidata.cast,
        release_date: movieApidata.release_date,
        original_language: movieApidata.original_language,
        tagline: movieApidata.tagline,
        vote_average: movieApidata.vote_average,
        vote_count: movieApidata.vote_count,
        runtime: movieApidata.runtime,
      };

      movie = await this.movieModel.create(movieDetails);
    }

    const showsToCreate: ShowsToCreate[] = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: [],
        });
      });
    });

    if (showsToCreate.length > 0) {
      await this.showModel.insertMany(showsToCreate);
    }
  }

  async getShows() {
    const shows = await this.showModel
      .find({
        showDateTime: { $gte: new Date() },
      })
      .populate('movie')
      .sort({ showDateTime: 1 });

    // const uniqueshow = new Set(shows.map((show) => show.movie));
    // return uniqueshow;
    const uniqueMovies = Array.from(
      new Map(shows.map((s) => [s.movie._id.toString(), s.movie])).values(),
    );
    return uniqueMovies;
  }

  async getShow(movieId: string) {
    const shows = await this.showModel.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });

    const movie = await this.movieModel.findById(movieId);
    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split('T')[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });

    return { movie, dateTime };
  }
}
