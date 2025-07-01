import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Show } from 'src/shows/schema/show.schema';
import { User } from 'src/users/schema/user.schema';

// export type BookingDocument = Booking & Document;
export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Show' })
  show: Show;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, type: [String] })
  bookedSeats: string[];

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop()
  paymentLink?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
