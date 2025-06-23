import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Show } from 'src/shows/schema/show.schema';
import { User } from 'src/users/schema/user.schema';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId | User;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Show' })
  show: Types.ObjectId | Show;

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
