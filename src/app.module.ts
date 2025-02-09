import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { MarketModule } from './market/market.module';
import { TradeModule } from './trade/trade.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [ConfigModule.forRoot(), CompanyModule, SupabaseModule, MarketModule, TradeModule, NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
