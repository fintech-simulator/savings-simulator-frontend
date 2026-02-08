export interface Product {
  id: string;
  name: string;
  type: string;
  description: string;
  interestRate: number;
  minAmount: number;
  imageUrl: string;
}

export interface SimulationRequest {
  initialAmount: number;
  monthlyContribution: number;
  months: number;
  annualInterestRate: number;
}

export interface SimulationResponse {
  estimatedProfit: number;
  totalBalance: number;
}

export interface OnboardingRequest {
  name: string;
  document: string;
  email: string;
  recaptchaToken: string;
}

export interface OnboardingResponse {
  id: string;
  message: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
