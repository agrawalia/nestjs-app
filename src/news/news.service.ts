import { HttpStatus, Injectable } from '@nestjs/common';
import { Utils } from 'src/common/utils';
import { News } from 'src/models/news.model';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class NewsService {

    constructor(private readonly supabaseService: SupabaseService) {}

    async getAllNews(sector?: string) {
        try {
            let query = this.supabaseService.getClient().from('news').select(`
                id, 
                company_id, 
                headline, 
                sector, 
                sentiment, 
                created_at,
                company:company_id (id, company_name, price_per_share, security_type, estimated_valuation)
              `);
            
            if (sector) {
                query = query.eq('sector', sector);
            }
          
              const { data } = await query;
              return Utils.successResponse('News retrieved successfully', data);

        } catch (error) {
            return Utils.errorResponse('Error while retrieving news data', HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    async createNews(newsData: News) {
        try {
            const { data } = await this.supabaseService
                .getClient()
                .from('news')
                .insert([newsData])
                .select();
    
            return Utils.successResponse('News created successfully', data);
        } catch (error) {
            return Utils.errorResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    async updateNews(newsId: number, updateData: Partial<News>) {
        try {
            const { data } = await this.supabaseService
                .getClient()
                .from('news')
                .update(updateData)
                .eq('id', newsId)
                .select();
    
            return Utils.successResponse('News updated successfully', data);
        } catch (error) {
            return Utils.errorResponse("Failed to update news", HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    async deleteNews(newsId: number) {
        try {
            await this.supabaseService
                .getClient()
                .from('news')
                .delete()
                .eq('id', newsId);
    
            return Utils.successResponse('News deleted successfully', null);
        } catch (error) {
            return Utils.errorResponse("Failed to delete news", HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }
}
