import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
    async signUp(@Body() user) {
        const userData=await this.authService.signUpUser(user);
        return userData;
    }
}
