import { Item } from "@/schemas/actorSheetSchema";
import SheetSection from "./abilities/SheetSection";
import ItemCard from "./ItemCard";

interface ItemsSectionProps {
    title: string;
    icon: string;
    items: Item[];
}

const ItemsSectionSection = ({ title, icon, items }: ItemsSectionProps) => {
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

export default ItemsSectionSection;
