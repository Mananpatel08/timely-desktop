import apiClient from "./client";
import type { EmailCheckPayload, IEmailCheckResponse, LoginResponse } from "@/types/auth";

export const AuthService = {
    getCSRF: () => apiClient.get("/auth/get-csrf-token/"),
    login: async (payload: FormData): Promise<LoginResponse> => {
        const { data } = await apiClient.post("/auth/sign-in/", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    },
    emailCheck: async (payload: EmailCheckPayload): Promise<IEmailCheckResponse> => {
        const { data } = await apiClient.post("/auth/email-check/", payload);
        return data;
    },
};
