import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import type { Request, Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cat')
  // *通配符 如： /cat/*
  getAllCat(@Res() response: Response): Response {
    return response.send([
      {
        name: 'Kitty',
        age: 2,
      },
      {
        name: 'Mimi',
        age: 3,
      },
    ]);
  }

  @Get('cat/:age')
  getCat(
    @Req() request: Request,
    @Res() response: Response,
    @Param('age') age: string,
  ): Response {
    const name =
      typeof request?.query?.name === 'string' ? request.query.name : 'Kitty';
    const ageParam = age ? `, age ${age}` : '';
    const Ip = request.ip;
    console.log(`Request from IP: ${Ip}`);
    return response.send(`Meow! My name is ${name}${ageParam}.`);
  }

  @Post('cat')
  @HttpCode(200)
  @Header('Cache-Control', 'no-store')
  postCat(@Res() response: Response): Response {
    return response.send(`Meow! My name is XIAOGUAI age 3.`);
  }

  @Get('vitest')
  @Redirect('https://vitest.dev/', 302)
  redirectToVitest() {
    return 'https://cn.vitest.dev/';
  }
}
