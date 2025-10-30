import apiClient from "./client";
import type { EmailCheckPayload, ICsrfTokenData, IEmailCheckResponse, LoginPayload, LoginResponse } from "@/types/auth";

export const AuthService = {
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const { data } = await apiClient.post("/auth/sign-in/", payload);
        return data;
    },
    requestCSRFToken: async (): Promise<ICsrfTokenData> => {
        const { data } = await apiClient.get("/auth/get-csrf-token/");
        return data;
    },
    emailCheck: async (payload: EmailCheckPayload): Promise<IEmailCheckResponse> => {
        const { data } = await apiClient.post("/auth/email-check/", payload);
        return data;
    },
};
