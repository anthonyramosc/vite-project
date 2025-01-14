import {LoginCredentials, LoginResponse} from "../types/auth.ts";

const API_URL = 'http://localhost:3000/api';

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al iniciar sesión');
        }

        return response.json();
    }
};