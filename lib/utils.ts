import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Job } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export function isValidJob(job: Job) {
  let hasError = false;
  const newError = {
    company: "",
    role: "",
    status: "",
    link: "",
  };
  if (!job.company.trim()) {
    newError.company = "O nome da empresa é obrigatório.";
    hasError = true;
  }
  if (!job.role.trim()) {
    newError.role = "O cargo é obrigatório.";
    hasError = true;
  }
  if (!job.status.trim()) {
    newError.status = "O status da candidatura é obrigatório.";
    hasError = true;
  }
  if (job.link && !isValidUrl(job.link)) {
    newError.link = "Por favor, insira uma URL válida.";
    hasError = true;
  }
  if (hasError) {
    return {
      isValid: false,
      errors: newError,
    };
  }
  return { isValid: true, errors: null };
}
