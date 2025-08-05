import { Job } from "./jobs";

export interface Application {
  id: number;
  job: Job;
  applicant_username: string;
  applicant_email: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  applied_at: string;
  updated_at: string;
}
