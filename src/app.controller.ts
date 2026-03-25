import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(":id")
  getHello(@Param() params: any ,@Param('id') id:string): string {
    console.log('Params :', params);
     console.log('Id :', id);
    return this.appService.getHello();
  }

  @Post()
  postHello(@Body() body: any): string {
    console.log('Body :', body);
    return this.appService.getHello();
  }
}
