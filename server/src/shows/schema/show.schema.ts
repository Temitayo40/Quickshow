import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Movie } from 'src/movies/schema/movie.schema';

// import { ref } from 'process';

export type ShowDocument = Show & Document;

@Schema({ minimize: false })
// @Schema({ timestamps: true })
export class Show {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Movie' })
  movie: Movie;
  // movie: mongoose.Types.ObjectId;

  @Prop({ required: true, type: Date })
  showDateTime: Date;

  @Prop({ required: true })
  showPrice: number;

  @Prop({ type: Map, of: String, default: {} })
  occupiedSeats: Map<string, string>;
}

export const ShowSchema = SchemaFactory.createForClass(Show);
