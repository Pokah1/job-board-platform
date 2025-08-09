// auth.types.ts
export interface RegistrationData {
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  phone_number?: string;
  address?: string;
}

export interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface User {
  id: number;
  username: string;
  full_name?: string | null;
  email?: string | null;
}