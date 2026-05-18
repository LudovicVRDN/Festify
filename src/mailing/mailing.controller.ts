import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

 
  
}
