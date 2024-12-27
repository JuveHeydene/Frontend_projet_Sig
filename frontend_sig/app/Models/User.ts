export interface User {
    id: number; // Assuming the User model has an auto-generated primary key
    name: string;
    surname: string|null;
    gender: "MALE" | "FEMALE"; // Adjust based on the Gender enum choices
    political_party?: string | null; // Nullable and optional
    tel: string;
    email: string;
    password?: string | null; // Nullable and optional
    birthdate: string; // Using string for date to handle ISO format
    role: string; // Adjust based on the UserRole enum choices
    bureau_de_vote?:string|null; // Nullable
    centre_de_vote?: string| null; // Nullable
    created_by?: string| null; // Nullable
    is_active: true;
    is_staff: false;
  }
export interface VotingCenter {
    label: string;
    value: string;
  }
export interface ArrondissmentOptions{
  label: string;
    value: string;
}