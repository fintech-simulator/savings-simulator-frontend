import { axiosClient } from "./axios.client";
import { IProductRepository } from "../../domain/repositories/product.repository";
import {
  Product,
  SimulationRequest,
  SimulationResponse,
  OnboardingRequest,
  OnboardingResponse,
} from "../../domain/entities";

export class ProductApiRepository implements IProductRepository {
  async getProducts(params?: {
    name?: string;
    type?: string;
  }): Promise<Product[]> {
    const { data } = await axiosClient.get<Product[]>("/products", { params });
    return data;
  }

  async simulate(params: SimulationRequest): Promise<SimulationResponse> {
    const { data } = await axiosClient.post<SimulationResponse>(
      "/simulator",
      params,
    );
    return data;
  }

  async submitOnboarding(
    params: OnboardingRequest,
  ): Promise<OnboardingResponse> {
    const { data } = await axiosClient.post<OnboardingResponse>(
      "/onboarding",
      params,
    );
    return data;
  }
}

export const productRepository = new ProductApiRepository();
