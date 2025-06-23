import { IsEmail, IsOptional } from 'class-validator';

// dto/create-user.dto.ts
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  googleId?: string;

  @IsOptional()
  imageUrl?: string;
}
