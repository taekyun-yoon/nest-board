/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, HttpStatus, Logger, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly AppService: AppService,
    private readonly configService: ConfigService
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
  }


  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req){
    return req.user;
  }
}
