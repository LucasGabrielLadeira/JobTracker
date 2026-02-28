import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Job } from "@/types";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import { updateStatus } from "@/services/jobs";
import JobCard from "./jobCard";

export default function CardColumn({ title, status, jobs, textFilter, deleteJob, onMoveJob }: {
    title: string;
    status: string;
    jobs: Job[];
    textFilter: string;
    deleteJob: (id: string) => void;
    onMoveJob: (id: string, newStatus: string) => void;
}) {

    const { handleOnDragStart, handleOnDrop, handleOnDragOver } = useDragAndDrop();
    const filteredJobs = jobs.filter(
        job =>
            job.status === status &&
            (
                job.company.toLowerCase().includes(textFilter.toLowerCase()) ||
                job.role.toLowerCase().includes(textFilter.toLowerCase())
            )
    );

    return (
        <div className="w-80 h-full flex-shrink-0" onDrop={(e) => {
            const id = handleOnDrop(e);
            onMoveJob(id, status);
        }} onDragOver={handleOnDragOver}>

            <div className="flex flex-col h-full min-h-0 p-4">

                {/* Título fixo */}
                <h1 className="text-xl font-bold mb-4 shrink-0">
                    {title}
                </h1>

                {/* Área que pode rolar */}
                <div className="flex-1 min-h-0">
                    <ScrollArea className="h-full pr-4">
                        <div className="flex flex-col gap-4 pr-2">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        deleteJob={deleteJob}
                                        handleOnDragStart={handleOnDragStart}
                                    />
                                ))) : (
                                textFilter ? (
                                    <p className="text-sm text-gray-500 text-center">
                                        Nenhuma vaga encontrada para "{textFilter}" neste status.
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        Tudo limpo por aqui ✨
                                        <br />
                                        Mova ou adicione vagas para este status.
                                    </p>)
                            )}
                        </div>
                    </ScrollArea>
                </div>

            </div>
        </div>

    );
}