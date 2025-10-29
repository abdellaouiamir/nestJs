import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';
import { JwtAccessGuard } from './guard/jwt.access.guard';
import { JwtRefreshGuard } from './guard/jwt.refresh.guard';

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalGuard)
  login(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @Post("getRefresh")
  @UseGuards(JwtAccessGuard)
  getRrefreshToken(@Request() req){
    return req.user;
  }

  @Post("getAccess")
  @UseGuards(JwtRefreshGuard)
  testRrefreshToken(@Request() req){
    return req.user;
  }
}
