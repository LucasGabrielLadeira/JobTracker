import CardColumn from "@/components/cardColumn";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";

export default function JobBoard({ isLoading, jobs, textFilter, updateStatus, deleteJob }: {
    isLoading: boolean;
    jobs: Job[];
    textFilter: string;
    updateStatus: (id: string, newStatus: string) => void;
    deleteJob: (id: string) => void;
}) {
    const titles = {
        interested: "Interessado",
        applied: "Aplicado",
        interview: "Entrevista",
        offer: "Proposta",
        rejected: "Recusado"
    };

    async function handleMoveJob(id: string, status: string) {
        await updateStatus(id, status);
    }
    return (
        <div className="flex-1 mt-4 overflow-x-auto overflow-y-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <div className="flex h-full min-h-0 justify-between p-4">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Button variant="outline" disabled size="sm">
                            <Spinner data-icon="inline-start size-20" />
                            Carregando
                        </Button>
                    </div>
                ) : (
                    Object.entries(titles).map(([status, title]) => (
                        < >
                            <CardColumn
                                key={status}
                                status={status}
                                title={title}
                                jobs={jobs}
                                textFilter={textFilter}
                                deleteJob={deleteJob}
                                onMoveJob={handleMoveJob}
                            />

                            {status !== "rejected" && (
                                <Separator
                                    key={status + "-separator"}
                                    orientation="vertical"
                                    className="w-px bg-gray-300"
                                />
                            )}
                        </>
                    ))
                )}
            </div>
        </div >
    );
}
