import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { CompanyModule } from 'src/company/company.module';
import { MarketModule } from 'src/market/market.module';

@Module({
  imports:[SupabaseModule, CompanyModule, MarketModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService]
})
export class NewsModule {}
