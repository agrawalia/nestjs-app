export interface Company {
    id?: number; // Optional for new inserts
    company_name: string;
    price_per_share: number;
    security_type: string;
    last_round_price_per_share : number;
    last_round_date: Date;
    last_round_valuation: number;
    currency: string;
    estimated_valuation: number;
    indicate_interest: boolean;
    created_at?: Date;
}
