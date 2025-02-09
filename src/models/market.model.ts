import { Company } from "./company.model";

export interface Market {
    id?: number;
    company_id: number;
    type: string;
    structure: string;
    share_class: string;
    source: string;
    updated: Date;
    currency: string;
    size: number;
    created_at?: Date;
    company?: Company;

}
