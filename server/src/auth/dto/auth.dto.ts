/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @MinLength(6)
  confirmPassword: string;

  @IsNotEmpty()
  name: string;
}
