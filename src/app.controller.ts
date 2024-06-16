/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, HttpStatus, Logger, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly AppService: AppService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
    ) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(@Ip() ip: string): string {
    console.log(`${ip}`);
    this.logger.log(ip);
    this.logger.warn(ip);
    this.logger.debug(ip);
    this.logger.error(ip);
    this.logger.fatal(ip);

    console.log(this.configService.get('ENVIRONMENT'))

    return this.appService.getHello();
    // throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Get('name')
  getName(
    @Query('name') name: string
  ): string {
    return `${name} hello `;
  }ç


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req){
    return this.authService.login(req.user); 
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req){
    return req.user;
  }
}
