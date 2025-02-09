import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports:[SupabaseModule, CompanyModule],
  controllers: [MarketController],
  providers: [MarketService],
  exports: [MarketService]
})
export class MarketModule {}
