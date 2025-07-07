import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserRole } from 'src/users/schema/user.schema';
import { LoginDto, RegisterDto } from './dto/auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport will handle redirect
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req()
    req: {
      user: {
        email: string;
        name: string;
        googleId: string;
        role?: UserRole;
      };
    },
    @Res() res: Response,
  ) {
    const CLIENT_REDIRECT =
      process.env.CLIENT_CALLBACK_URL ||
      'https://free-realm-quickshow.netlify.app/auth/callback';

    const user = req.user;
    const token: { access_token?: string } =
      await this.authService.loginOrRegisterGoogleUser(user);
    if (!token || !token.access_token) {
      return res.redirect(`${CLIENT_REDIRECT}?error=token_missing`);
    }
    return res.redirect(`${CLIENT_REDIRECT}?token=${token.access_token}`);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user: any = await this.authService.validateUser(
      body.email,
      body.password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body()
    body: RegisterDto,
  ) {
    return await this.authService.register(body);
  }
}
