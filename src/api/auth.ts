import apiClient from "./client";
import type { EmailCheckPayload, IEmailCheckResponse, LoginPayload, LoginResponse } from "@/types/auth";

export const AuthService = {
    getCSRF: () => apiClient.get("/auth/get-csrf-token/"),
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const { data } = await apiClient.post("/auth/sign-in/", payload);
        return data;
    },
    emailCheck: async (payload: EmailCheckPayload): Promise<IEmailCheckResponse> => {
        const { data } = await apiClient.post("/auth/email-check/", payload);
        return data;
    },
};
