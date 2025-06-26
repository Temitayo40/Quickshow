import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from 'src/movies/schema/movie.schema';
import { ShowSchema } from './schema/show.schema';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Show', schema: ShowSchema },

      { name: 'Movie', schema: MovieSchema },
    ]),
  ],
  controllers: [ShowsController],
  providers: [ShowsService],
  exports: [ShowsService, MongooseModule],
})
export class ShowsModule {}
