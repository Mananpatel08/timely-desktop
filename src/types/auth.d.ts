export interface LoginPayload {
    email: string;
    password: string;
    csrfmiddlewaretoken: string;
}

interface LoginResponse {
    token: string;
    user: { id: string; name: string };
    
}

export interface ICsrfTokenData {
    csrf_token: string;
}

export interface IEmailCheckResponse {
    status: "MAGIC_CODE" | "CREDENTIAL";
    existing: boolean;
    is_password_autoset: boolean;
    user_status?: "exist" | "invited" | "not_exist";
}

interface EmailCheckPayload {
    email: string;
}