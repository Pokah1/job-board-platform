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
}