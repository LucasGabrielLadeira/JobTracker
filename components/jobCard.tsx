import { Job } from "@/types";
import { Trash } from "lucide-react";
import { TruncatedNotes } from "./truncatedNotes";

export default function JobCard({ job, deleteJob, handleOnDragStart }: {
    job: Job, deleteJob: any, handleOnDragStart: (e: React.DragEvent<HTMLDivElement>,
        id: string) => void
}) {
    return (
        <div
            key={job.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-grab"
            draggable
            onDragStart={(e) => handleOnDragStart(e, job.id!)}
        >
            <div className="flex items-start gap-2 relative">
                <h2 className="text-md font-semibold">
                    {job.company}
                </h2>
                <Trash onClick={() => job.id && deleteJob(job.id)} className="h-4 w-4 text-red-500 cursor-pointer absolute right-0 top-0" />
            </div>
            <p className="text-sm">{job.role}</p>
            {job.link && (
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm mt-2 block hover:text-blue-700">
                    Ver Vaga
                </a>
            )}
            {job.notes && (
                <TruncatedNotes notes={job.notes} />
            )}
        </div>
    );
}