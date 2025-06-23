import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Movie } from 'src/movies/schema/movie.schema';

export type ShowDocument = Show & Document;

@Schema({ minimize: false })
// @Schema({ timestamps: true })
export class Show {
  //type string
  @Prop({ required: true, ref: 'Movie' })
  movie: Movie;

  @Prop({ required: true, type: Date })
  showwDateTime: Date;

  @Prop({ required: true })
  showPrice: number;

  @Prop({ tyep: [Object], default: {} })
  occupiedSeats: {
    [seatId: string]: string;
  };
}

export const ShowSchema = SchemaFactory.createForClass(Show);
