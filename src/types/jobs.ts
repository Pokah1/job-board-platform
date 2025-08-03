export interface Job {
    id?:number;
    title: string;
    company: string;
    location: string;
    salary?: string;
    description?: string
    status?: "Pending" | "Accepted" | "Rejected";
}