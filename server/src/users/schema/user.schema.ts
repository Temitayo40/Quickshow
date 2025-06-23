import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;
export enum UserRole {
  ADMIN = 'admin',
  VIEWER = 'viewer',
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: UserRole.VIEWER, enum: UserRole })
  role: UserRole;

  @Prop({ index: true })
  googleId?: string;

  @Prop()
  imageUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
