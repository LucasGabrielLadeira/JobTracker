"use client";
import { isValidJob } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Job } from "@/types";
import { toast } from "sonner";
import * as jobsService from "@/services/jobs";

export default function useJobs() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [errors, setErrors] = useState({
    company: "",
    role: "",
    status: "",
    link: "",
  });

  const createJob = async (job: Job) => {
    const { isValid, errors: validationErrors } = isValidJob(job);

    if (!isValid && validationErrors) {
      setErrors(validationErrors);
      toast.error("Por favor, corrija os erros antes de adicionar a vaga.");
      return;
    }

    try {
      const newJob = await jobsService.createJob(job);
      setJobs((prev) => [...prev, newJob]);
      toast.success("Vaga criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar a vaga. Tente novamente.");
      console.error(error);
    }
  };

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      const fetchJobs = await jobsService.loadJobs();
      setJobs(fetchJobs);
      setIsLoading(false);
    } catch (error) {
      toast.error("Erro ao carregar as vagas. Tente novamente.");
      console.error(error);
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const jobToUpdate = jobs.find((job) => job.id === id);
    if (jobToUpdate && jobToUpdate.status !== newStatus) {
      try {
        const updatedJob = await jobsService.updateStatus(id, newStatus);
        setJobs((prevJobs) =>
          prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
        );
        toast.success("Status da vaga atualizado!");
      } catch (error) {
        toast.error("Erro ao atualizar o status da vaga. Tente novamente.");
        console.error(error);
      }
    }
  };

  const deleteJob = async (id?: string) => {
    if (!id) {
      toast.error("Erro ao deletar vaga.");
      return;
    }

    try {
      const response = await jobsService.deleteJob(id);

      setJobs((prev) => prev.filter((job) => job.id !== id));

      toast.success("Vaga deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar a vaga. Tente novamente.");
      console.error(error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return {
    jobs,
    isLoading,
    errors,
    createJob,
    updateStatus,
    deleteJob,
  };
}
