import { useEffect, useRef, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
export function TruncatedNotes({ notes }: { notes?: string }) {
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;

        const checkTruncation = () => {
            setIsTruncated(el.scrollHeight > el.clientHeight);
        };

        checkTruncation();

        window.addEventListener("resize", checkTruncation);
        return () => window.removeEventListener("resize", checkTruncation);
    }, [notes]);

    if (!notes) return null;

    const text = (
        <p
            ref={textRef}
            className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3"
        >
            {notes}
        </p>
    );

    if (!isTruncated) {
        return text;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {text}
                </TooltipTrigger>
                <TooltipContent className="max-w-xs whitespace-pre-wrap">
                    {notes}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}