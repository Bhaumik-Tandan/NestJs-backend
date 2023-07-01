import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import mongoose from 'mongoose';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto) {
    createCompanyDto.user = '64a055c107ae996be0bcc481';
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  find() {
    const userId = new mongoose.Types.ObjectId('64a055c107ae996be0bcc481');
    return this.companyService.find(userId);
  }
}
