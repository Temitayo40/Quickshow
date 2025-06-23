import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  overview: string;

  @Prop({ required: true })
  poster_path: string;

  @Prop({ required: true })
  backdrop_path: string;

  @Prop({ required: true })
  release_date: string;

  @Prop()
  original_language: string;

  @Prop()
  tagline: string;

  @Prop({ required: true, type: [Object] })
  genres: { id: number; name: string };

  @Prop({ required: true, type: [Object] })
  casts: {
    name: string;
    profile_path: string;
  };

  @Prop({ required: true })
  vote_average: number;

  @Prop({ required: true })
  runtime: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
