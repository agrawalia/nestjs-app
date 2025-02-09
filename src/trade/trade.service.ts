import { HttpStatus, Injectable } from '@nestjs/common';
import { Utils } from 'src/common/utils';
import { Trade } from 'src/models/trade.model';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class TradeService {
    constructor(private readonly supabaseService: SupabaseService) {}

    async getAllTrades() {
        try {
            // Fetch trades with company data
            const { data: trades, error: tradeError } = await this.supabaseService
              .getClient()
              .from('trades')
              .select(`
                id, 
                type, 
                closed_date, 
                upload_date, 
                currency, 
                volume,
                company_id,
                company:company_id (id, company_name, price_per_share, security_type, estimated_valuation)
              `);
        
            if (tradeError) {
              return Utils.errorResponse('Error fetching trades data', HttpStatus.INTERNAL_SERVER_ERROR, tradeError);
            }
        
            // Fetch market data separately
            const { data: markets, error: marketError } = await this.supabaseService
              .getClient()
              .from('markets')
              .select(`
                id, 
                company_id, 
                type, 
                structure, 
                share_class, 
                source, 
                updated, 
                currency, 
                size
              `);
        
            if (marketError) {
              return Utils.errorResponse('Error fetching market data', HttpStatus.INTERNAL_SERVER_ERROR, marketError);
            }
        
            // Merge market data into trades based on company_id
            const tradesWithMarkets = trades.map(trade => ({
              ...trade,
              market: markets.find(market => market.company_id === trade.company_id) || null
            }));
        
            return Utils.successResponse('Trades retrieved successfully', tradesWithMarkets);
        } catch (error) {
            return Utils.errorResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
      }

      async createTrade(tradeData: Trade) {
        try {
            const { data, error } = await this.supabaseService
                .getClient()
                .from('trades')
                .insert([tradeData])
                .select();
    
            return Utils.successResponse('Trade created successfully', data);
        } catch (error) {
            return Utils.errorResponse("Failed to create trade", HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    async updateTrade(tradeId: number, updateData: Partial<Trade>) {
        try {
            const { data, error } = await this.supabaseService
                .getClient()
                .from('trades')
                .update(updateData)
                .eq('id', tradeId)
                .select();
    
            return Utils.successResponse('Trade updated successfully', data);
        } catch (error) {
            return Utils.errorResponse("Failed to update trade", HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    async deleteTrade(tradeId: number) {
        try {
            await this.supabaseService
                .getClient()
                .from('trades')
                .delete()
                .eq('id', tradeId);
    
            return Utils.successResponse('Trade deleted successfully', null);
        } catch (error) {
            return Utils.errorResponse("Failed to delete trade", HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }
}
