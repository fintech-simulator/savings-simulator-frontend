import {
  Product,
  SimulationRequest,
  SimulationResponse,
  OnboardingRequest,
  OnboardingResponse,
  PaginatedResponse,
} from "../entities";

export interface IProductRepository {
  getProducts(params?: {
    name?: string;
    type?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Product>>;
  simulate(data: SimulationRequest): Promise<SimulationResponse>;
  submitOnboarding(data: OnboardingRequest): Promise<OnboardingResponse>;
}
