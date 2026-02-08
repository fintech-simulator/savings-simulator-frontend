import { useMutation } from "@tanstack/react-query";
import { productRepository } from "../../infrastructure/http/product.api";
import { SimulationRequest } from "../../domain/entities";

export function useSimulation() {
  const mutation = useMutation({
    mutationFn: (params: SimulationRequest) =>
      productRepository.simulate(params),
  });

  return mutation;
}
