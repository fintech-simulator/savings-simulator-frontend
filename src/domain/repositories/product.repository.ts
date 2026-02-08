import {
  Product,
  SimulationRequest,
  SimulationResponse,
  OnboardingRequest,
  OnboardingResponse,
} from "../entities";

export interface IProductRepository {
  getProducts(params?: { name?: string; type?: string }): Promise<Product[]>;
  simulate(data: SimulationRequest): Promise<SimulationResponse>;
  submitOnboarding(data: OnboardingRequest): Promise<OnboardingResponse>;
}
