export interface Job {
  id?: string;
  company: string;
  role: string;
  status: string;
  notes?: string;
  link?: string;
  createdAt?: Date;
}
