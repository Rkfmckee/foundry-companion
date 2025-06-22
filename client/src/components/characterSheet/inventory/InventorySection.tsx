import { Item } from "@/schemas/actorSheetSchema";
import SheetSection from "../abilities/ProficienciesSection";
import ItemCard from "./ItemCard";

interface InventorySectionProps {
    title: string;
    icon: string;
    items: Item[];
}

const InventorySection = ({ title, icon, items }: InventorySectionProps) => {
    return (
        <>
            {items.length > 0 && (
                <SheetSection title={title} icon={icon}>
                    {items.map((i, idx) => (
                        <ItemCard key={idx} item={i} />
                    ))}
                </SheetSection>
            )}
        </>
    );
};

export default InventorySection;
