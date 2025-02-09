import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TradeService } from './trade.service';
import { Trade } from 'src/models/trade.model';

@Controller('trade')
export class TradeController {

    constructor(private readonly tradeService : TradeService) {}

    @Get()
    async getAllTrades() {
        return this.tradeService.getAllTrades();
    }

    @Post()
    async createTrade(@Body() tradeData: Trade) {
        return this.tradeService.createTrade(tradeData);
    }

    @Put(':id')
    async updateTrade(@Param('id') id: number, @Body() tradeData: Trade) {
        return this.tradeService.updateTrade(id, tradeData);
    }

    @Delete(':id')
    async deleteTrade(@Param('id') id: number) {
        return this.tradeService.deleteTrade(id);
    }

}
