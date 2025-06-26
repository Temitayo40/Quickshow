import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShowsInput, ShowsToCreate } from './schema/show.interface';
import { ShowDocument } from './schema/show.schema';
import axios from 'axios';
import { RpcException } from '@nestjs/microservices';
import { MovieDocument } from 'src/movies/schema/movie.schema';

@Injectable()
export class ShowsService {
  constructor(
    @InjectModel('Movie')
    private movieModel: Model<MovieDocument>,

    @InjectModel('Show')
    private showModel: Model<ShowDocument>,
  ) {}

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
    } catch (error: unknown) {
      console.error('Error fetching now playing movies:', error);
      throw new RpcException('Failed to fetch now playing movies');
    }
  }

  async addShow(movieId: string, showsInput: ShowsInput[], showPrice: number) {
    let movie = await this.movieModel.findOne({ tmdbId: movieId });

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

      const movieApidata = movieDetailResponse.data;
      const movieCreditData = movieCreditResponse.data;

      const movieDetails = {
        tmdbId: movieId,
        title: movieApidata.title,
        overview: movieApidata.overview,
        poster_path: movieApidata.poster_path,
        backdrop_path: movieApidata.backdrop_path,
        genres: movieApidata.genres,
        casts: movieCreditData.cast,
        release_date: movieApidata.release_date,
        original_language: movieApidata.original_language,
        tagline: movieApidata.tagline || '',
        vote_average: movieApidata.vote_average,
        runtime: movieApidata.runtime,
      };

      movie = await this.movieModel.create(movieDetails);
    }

    // Prepare show instances
    const showsToCreate: ShowsToCreate[] = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movie._id, // Use ObjectId here
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length > 0) {
      await this.showModel.insertMany(showsToCreate);
    }
  }

  async getShows() {
    const shows = await this.showModel
      .find({ showDateTime: { $gte: new Date() } })
      .populate('movie')
      .sort({ showDateTime: 1 });

    // const uniqueMovies = Array.from(
    //   new Map(shows.map((s) => [s.movie._id.toString(), s.movie])).values(),
    // );

    const uniqueShows = new Set(shows.map((show) => show.movie));

    return uniqueShows;
  }

  async getShow(movieId: string) {
    const movie = await this.movieModel.findOne({ tmdbId: movieId });
    if (!movie) return { movie: null, dateTime: {} };

    const shows = await this.showModel.find({
      movie: movie._id,
      showDateTime: { $gte: new Date() },
    });

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
