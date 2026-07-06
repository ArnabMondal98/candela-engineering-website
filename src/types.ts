export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  specs?: string[];
}

export interface ConsultancyItem {
  id: string;
  title: string;
  category: string;
  description: string;
  benefits?: string[];
  statutoryAgency?: string;
}

export interface TradingItem {
  id: string;
  title: string;
  category: string;
  description: string;
  specifications: string[];
}

export interface ClientItem {
  id: string;
  name: string;
  subtitle?: string;
  industry: string;
  logo?: string;
}

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: 'Project' | 'Consultancy' | 'Trading' | 'General';
  message: string;
  created_at?: string;
}
