import { HttpStatus, Injectable } from '@nestjs/common';
import { Utils } from 'src/common/utils';
import { Company } from 'src/models/company.model';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class CompanyService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllCompanies() {
    try {
        const { data } = await this.supabaseService
          .getClient()
          .from('companies')
          .select(`
            id,
            company_name,
            price_per_share,
            security_type,
            estimated_valuation,
            indicate_interest,
            market:markets (
              id, 
              company_id, 
              type, 
              structure, 
              share_class, 
              source, 
              updated, 
              currency, 
              size
            ),
            trades:trades (
              id, 
              company_id, 
              type, 
              closed_date, 
              upload_date, 
              currency, 
              volume
            )
          `);
    
        return Utils.successResponse('Companies retrieved successfully', data);
    } catch (error) {
        return Utils.errorResponse('Error fetching companies data', HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }

  async deleteCompany(companyId: number) {
    try {
        await this.supabaseService
            .getClient()
            .from('companies')
            .delete()
            .eq('id', companyId);

        return Utils.successResponse('Company deleted successfully', null);
    } catch (error) {
        return Utils.errorResponse("Failed to delete company", HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

async updateCompany(companyId: number, updateData: Partial<Company>) {
    try {
        const { data } = await this.supabaseService
            .getClient()
            .from('companies')
            .update(updateData)
            .eq('id', companyId)
            .select();

        return Utils.successResponse('Company updated successfully', data);
    } catch (error) {
        return Utils.errorResponse("Failed to update company", HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

async createCompany(companyData: Company) {
    try {
        const { data } = await this.supabaseService
            .getClient()
            .from('companies')
            .insert([companyData])
            .select();

        return Utils.successResponse('Company created successfully', data, HttpStatus.CREATED);
    } catch (error) {
        return Utils.errorResponse("Failed to create company", HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

  async toggleInterest(id: number) {
    try {
        const { data: company } = await this.supabaseService
          .getClient()
          .from('company')
          .select('indicate_interest')
          .eq('id', id)
          .single();
    
        if (!company) {
          throw new Error('Company not found');
        }
    
        const { data } = await this.supabaseService
          .getClient()
          .from('companies')
          .update({ indicate_interest: !company.indicate_interest })
          .eq('id', id)
          .select()
          .single();
    
        return Utils.successResponse('Interest is changed !', data, HttpStatus.OK);
        } catch (error) {
        return Utils.errorResponse(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }
}
