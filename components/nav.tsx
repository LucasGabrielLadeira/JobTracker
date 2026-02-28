import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import JobDialog from "./jobDialog";
export default function Nav({textFilter, setTextFilter, errors, createJob }: {textFilter: string, setTextFilter: (text: string) => void, errors: any, createJob: any }) {
    return (
        <nav className="flex w-full shadow-xl items-center gap-10 px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                JobTracker
            </h1>
            <div className="relative w-1/3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    value={textFilter}
                    type="text"
                    placeholder="Pesquisar vaga"
                    className="pl-9"
                    onChange={(e) => setTextFilter(e.target.value)}
                />
            </div>
            <JobDialog
                errors={errors}
                createJob={createJob}
            />
        </nav>
    );
}