import { Job } from "@/types";

export const loadJobs = async () => {
  const response = await fetch("/api/jobs");

  if (!response.ok) {
    throw new Error("Erro ao carregar vagas");
  }

  return response.json();
};

export const deleteJob = async (id: string) => {
  const response = await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Falha ao deletar a vaga");
  }

  return response.json();
};

export const createJob = async (job: Job) => {
  const response = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error("Falha na requisição");
  }

  return response.json();
};

export const updateStatus = async (id: string, newStatus: string) => {
  const response = await fetch(`/api/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    throw new Error("Falha na requisição");
  }

  return response.json();
};
