import { HttpStatus, Injectable } from '@nestjs/common';
import { Utils } from 'src/common/utils';
import { Market } from 'src/models/market.model';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class MarketService {
    constructor(private readonly supabaseService: SupabaseService) {}

    async getAllMarkets(type?: string) {
        try {
            let query = this.supabaseService.getClient().from('markets').select(`
              id, 
              company_id, 
              type, 
              structure, 
              share_class, 
              source, 
              updated, 
              currency, 
              size,
              created_at,
              company:company_id (id, company_name, price_per_share, security_type, estimated_valuation)
            `);
        
            if (type) {
              query = query.eq('type', type);
            }
        
            const { data } = await query;
            return Utils.successResponse('Markets retrieved successfully', data);
        } catch (error) {
            return Utils.errorResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    async createMarket(marketData: Market) {
        try {
            const { data } = await this.supabaseService
                .getClient()
                .from('markets')
                .insert([marketData])
                .select(); 
    
            return Utils.successResponse('Market created successfully', data);
        } catch (error) {
            return Utils.errorResponse("Failed to create market", 500, error);
        }
    }

    async updateMarket(marketId: number, updateData: Partial<Market>) {
        try {
            const { data } = await this.supabaseService
                .getClient()
                .from('markets')
                .update(updateData)
                .eq('id', marketId)
                .select();
    
            return Utils.successResponse('Market updated successfully', data);
        } catch (error) {
            return Utils.errorResponse("Failed to update market", HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    async deleteMarket(marketId: number) {
        try {
            await this.supabaseService
                .getClient()
                .from('markets')
                .delete()
                .eq('id', marketId);
    
            return Utils.successResponse('Market deleted successfully', null);
        } catch (error) {
            return Utils.errorResponse("Failed to delete market", HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }    
}
