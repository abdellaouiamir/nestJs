import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email: email });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  createAccessToken(user: any) {
    const payload = { sub: user.id, email: user.email }
    return this.jwtService.sign(payload)
  }
  createRefreshToken(user: any) {
    const payload = { sub: user.id, email: user.email }
    return this.jwtService.sign(payload,{
        secret: "abdellaouiamir",
        expiresIn: "5m"
      })
  }
  signIn(user: any) {
    return {
      access_token: this.createAccessToken(user),
      refresh_token: this.createRefreshToken(user)
    }
  }
}
