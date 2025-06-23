import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDocument } from './schema/movie.schema';
// 5:21 tmdb
@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('Movie')
    private movieModel: Model<MovieDocument>,
  ) {}

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
