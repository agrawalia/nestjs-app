import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { CompanyModule } from 'src/company/company.module';
import { MarketModule } from 'src/market/market.module';

@Module({
  imports:[SupabaseModule, CompanyModule, MarketModule],
  controllers: [TradeController],
  providers: [TradeService],
  exports: [TradeService]
})
export class TradeModule {}
