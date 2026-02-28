"use client";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import useJobs from "@/hooks/useJobs";
import { Job } from "@/types";

export default function JobDialog({ errors, createJob }: {
    errors: {
        company: string;
        role: string;
        status: string;
        link: string;
    },
    createJob: any
}) {
    const [open, setOpen] = useState(false);
    const emptyJob: Job = {
        company: "",
        role: "",
        status: "",
        notes: "",
        link: ""
    }
    const [job, setJob] = useState<Job>(emptyJob);

    function resetForm() {
        setJob(emptyJob);
    }

    function handleChange(field: keyof Job, value: string) {
        if (job) {
            setJob({ ...job, [field]: value });
        }
    }

    async function saveJob() {
        try {
            await createJob(job);
            resetForm();
            setOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="ml-auto bg-blue-500 text-white hover:bg-blue-600 hover:text-white flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Adicionar Vaga
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Adicionar Nova Vaga</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes da vaga para adicioná-la à sua lista de candidaturas.
                    </DialogDescription>
                </DialogHeader>
                <Field data-invalid={!!errors.company}>
                    <FieldLabel>Empresa</FieldLabel>
                    <FieldDescription>Digite o nome da empresa.</FieldDescription>
                    <Input type="text" placeholder="Ex: Google" value={job?.company || ""} onChange={(e) => { handleChange("company", e.target.value) }} />
                    <FieldDescription>
                        {errors.company && <span className="text-red-500">{errors.company}</span>}
                    </FieldDescription>
                </Field>
                <Field data-invalid={!!errors.role}>
                    <FieldLabel>Cargo</FieldLabel>
                    <FieldDescription>Digite o cargo para o qual você está se candidatando.</FieldDescription>
                    <Input type="text" placeholder="Ex: Engenheiro de Software" value={job?.role || ""} onChange={(e) => { handleChange("role", e.target.value) }} />
                    <FieldDescription>
                        {errors.role && <span className="text-red-500">{errors.role}</span>}
                    </FieldDescription>
                </Field>
                <Field data-invalid={!!errors.status}>
                    <FieldLabel>Status</FieldLabel>
                    <FieldDescription>
                        Selecione o estágio atual da candidatura.
                    </FieldDescription>
                    <Select value={job?.status || ""} onValueChange={(value) => { handleChange("status", value) }}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="interested">Interessado</SelectItem>
                                <SelectItem value="applied">Aplicado</SelectItem>
                                <SelectItem value="interview">Entrevista</SelectItem>
                                <SelectItem value="offer">Proposta</SelectItem>
                                <SelectItem value="rejected">Recusado</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FieldDescription>
                        {errors.status && <span className="text-red-500">{errors.status}</span>}
                    </FieldDescription>
                </Field>
                <Field data-invalid={!!errors.link}>
                    <FieldLabel>Link da Vaga</FieldLabel>
                    <FieldDescription>
                        Adicione o link para a descrição da vaga ou para a página de candidatura.
                    </FieldDescription>
                    <Input type="text" placeholder="Ex: https://www.linkedin.com/jobs/view/1234567890" value={job?.link || ""} onChange={(e) => handleChange("link", e.target.value)} />
                    <FieldDescription>
                        {!!errors.link && <span className="text-red-500">Por favor, insira uma URL válida.</span>}
                    </FieldDescription>
                </Field>
                <Field>
                    <FieldLabel>Notas</FieldLabel>
                    <FieldDescription>
                        Adicione quaisquer notas ou detalhes adicionais sobre a vaga.
                    </FieldDescription>
                    <Textarea placeholder="Ex: Enviar portfólio junto com o currículo" value={job?.notes || ""} onChange={(e) => handleChange("notes", e.target.value)} />
                </Field>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="bg-gray-500 text-white hover:bg-gray-600 hover:text-white" onClick={resetForm}>Cancelar</Button>
                    </DialogClose>
                    <Button type="button" className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white" onClick={() => {
                        saveJob();
                    }}>Adicionar Vaga</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
