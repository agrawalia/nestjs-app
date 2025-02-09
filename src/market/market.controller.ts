import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MarketService } from './market.service';
import { Market } from 'src/models/market.model';

@Controller('market')
export class MarketController {

    constructor(private readonly marketService : MarketService) {}

    @Get()
    async getAllMarkets(@Query('type') type?: string) {
        return this.marketService.getAllMarkets(type);
    }

    @Post()
    async createMarket(@Body() marketData: Market) {
        return this.marketService.createMarket(marketData);
    }

    @Put(':id')
    async updateMarket(@Param('id') id: number, @Body() marketData: Market) {
        return this.marketService.updateMarket(id, marketData);
    }

    @Delete(':id')
    async deleteMarket(@Param('id') id: number) {
        return this.marketService.deleteMarket(id);
    }
}
