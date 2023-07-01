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

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto) {
    createCompanyDto.user='64a0061259a176e4bd794ee9';
    return this.companyService.create(createCompanyDto);
  }

}
