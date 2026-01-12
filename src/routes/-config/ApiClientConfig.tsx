import { useEffect } from "react";
import { useToast } from "../../lib/providers/toast-context";
import { apiClient } from "../../lib/api-client";
import { useNavigate } from "@tanstack/react-router";
import type { ApiErrorDTO } from "../../lib/schemas/api-error";

export function ApiClientConfig() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.onErrorCallback = (error: ApiErrorDTO) => {
      const displayMessage =
        error.message || "There has been an unexpected error";

      showToast(displayMessage, "error");
    };

    apiClient.onLoggedOutCallback = () => navigate({ to: "/auth" });

    return () => {
      apiClient.onErrorCallback = () => {};
    };
  }, [showToast]);

  return null;
}
