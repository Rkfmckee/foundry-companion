import { ReactNode } from "react";

interface SheetSectionProps {
    title: string;
    icon: string;
    children?: ReactNode;
}

const SheetSection = ({ title, icon, children }: SheetSectionProps) => {
    return (
        <div className="mb-3">
            <div className="bottom-border">
                <i className={`fa-solid fa-${icon}`} />
                <strong className="mx-2">{title}</strong>
            </div>
            {children}
        </div>
    );
};

export default SheetSection;
