import { ActorSheetData, InventoryItemTypes } from "@/schemas/actorSheetSchema";
import { Box } from "@chakra-ui/react/box";
import { Text } from "@chakra-ui/react/typography";

interface CharacterSheetAbilitiesProps {
    sheet: ActorSheetData;
    setSheet: (sheet: ActorSheetData) => void;
}

const CharacterSheetAbilities = ({ sheet }: CharacterSheetAbilitiesProps) => {
    const inventoryItemTypes: readonly string[] = InventoryItemTypes;
    const inventoryItems = sheet.items.filter((i) => inventoryItemTypes.includes(i.type));

    return (
        <Box className="character-sheet__panel">
            {inventoryItems ? (
                <div>
                    {inventoryItems.map((i, idx) => (
                        <Text key={idx}>{i.name}</Text>
                    ))}
                    <Text></Text>
                </div>
            ) : (
                <Text>Inventory empty</Text>
            )}
        </Box>
    );
};

export default CharacterSheetAbilities;
