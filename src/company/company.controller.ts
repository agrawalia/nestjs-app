import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from 'src/models/company.model';

@Controller('company')
export class CompanyController {

  constructor(private readonly companyService : CompanyService) {}

  @Get()
  async getInvestments() {
    return this.companyService.getAllCompanies();
  }

  @Post()
  async createMarket(@Body() companyData: Company) {
    return this.companyService.createCompany(companyData);
  }

  @Put(':id')
  async updateMarket(@Param('id') id: number, @Body() companyData: Company) {
    return this.companyService.updateCompany(id, companyData);
  }

  @Delete(':id')
  async deleteMarket(@Param('id') id: number) {
    return this.companyService.deleteCompany(id);
  }

  @Post('toggle-interest/:id')
  async toggleInterest(@Param('id') id: string) {
    return this.companyService.toggleInterest(Number(id));
  }
}


