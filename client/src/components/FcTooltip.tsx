import { Tooltip } from "@/components/ui/tooltip";
import { ReactNode, useState } from "react";

interface FcTooltipProps {
    text: string;
    children: ReactNode;
}

const FcTooltip = ({ text: title, children }: FcTooltipProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Tooltip content={title} showArrow openDelay={0} closeDelay={0} open={open} onOpenChange={(event) => setOpen(event.open)}>
            <button onClick={() => setOpen(true)}>{children}</button>
        </Tooltip>
    );
};

export default FcTooltip;
