"use client"

import { useState } from "react";
import useJobs from "@/hooks/useJobs";
import Nav from "@/components/nav";
import JobBoard from "@/components/jobBoard";

export default function Home() {
  const { jobs, isLoading, errors, createJob, updateStatus, deleteJob } = useJobs();
  const [textFilter, setTextFilter] = useState("");

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-50 font-sans dark:bg-black">
      <Nav
        textFilter={textFilter}
        setTextFilter={setTextFilter}
        errors={errors}
        createJob={createJob}
      />
      <main className="flex flex-1 flex-col overflow-hidden px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Candidaturas
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Gerencie suas candidaturas de emprego de forma fácil e eficiente.
        </p>
        <JobBoard
          isLoading={isLoading}
          jobs={jobs}
          textFilter={textFilter}
          updateStatus={updateStatus}
          deleteJob={deleteJob}
        />
      </main >
    </div >
  );
}
