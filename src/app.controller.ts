/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, HttpStatus, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(@Ip() ip: string): string {
    console.log(`${ip}`);
    this.logger.log(ip);
    this.logger.warn(ip);
    this.logger.debug(ip);
    this.logger.error(ip);
    this.logger.fatal(ip);

    return this.appService.getHello();
    // throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Get('name')
  getName(
    @Query('name') name: string
  ): string {
    return `${name} hello `;
  }
}
