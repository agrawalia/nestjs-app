import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from 'src/models/news.model';

@Controller('news')
export class NewsController {

    constructor(private readonly newsService : NewsService) {}

    @Get('getAllNews')
    async getAllTrades() {
        return this.newsService.getAllNews();
    }

    @Post()
    async createNews(@Body() newsData: News) {
        return this.newsService.createNews(newsData);
    }

    @Put(':id')
    async updateNews(@Param('id') id: number, @Body() newsData: News) {
        return this.newsService.updateNews(id, newsData);
    }

    @Delete(':id')
    async deleteNews(@Param('id') id: number) {
        return this.newsService.deleteNews(id);
    }
}
