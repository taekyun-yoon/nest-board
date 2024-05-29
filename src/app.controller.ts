/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Ip() ip: string): string {
    console.log(`${ip}`);
    // return this.appService.getHello();
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Get('name')
  getName(
    @Query('name') name: string
  ): string {
    return `${name} hello `;
  }
}
