import { ActorSheetData } from "@/schemas/actorSheetSchema";
import { Box } from "@chakra-ui/react/box";
import InventorySection from "./InventorySection";

interface CharacterSheetAbilitiesProps {
    sheet: ActorSheetData;
    setSheet: (sheet: ActorSheetData) => void;
}

const CharacterSheetAbilities = ({ sheet }: CharacterSheetAbilitiesProps) => {
    const weapons = sheet.items.filter((i) => i.type == "weapon");
    const equipment = sheet.items.filter((i) => i.type == "equipment");
    const consumables = sheet.items.filter((i) => i.type == "consumable");
    const tools = sheet.items.filter((i) => i.type == "tool");
    const loot = sheet.items.filter((i) => i.type == "loot");
    const containers = sheet.items.filter((i) => i.type == "container");

    return (
        <Box className="character-sheet__panel">
            <InventorySection title="Weapons" icon="utensils" items={weapons} />
            <InventorySection title="Equipment" icon="shield" items={equipment} />
            <InventorySection title="Consumables" icon="flask" items={consumables} />
            <InventorySection title="Tools" icon="wrench" items={tools} />
            <InventorySection title="Loot" icon="gem" items={loot} />
            <InventorySection title="Containers" icon="suitcase" items={containers} />
        </Box>
    );
};

export default CharacterSheetAbilities;
