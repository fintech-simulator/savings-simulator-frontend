import { useMutation } from "@tanstack/react-query";
import { productRepository } from "../../infrastructure/http/product.api";
import { OnboardingRequest } from "../../domain/entities";

export function useOnboarding() {
  const mutation = useMutation({
    mutationFn: (params: OnboardingRequest) =>
      productRepository.submitOnboarding(params),
  });

  return mutation;
}
