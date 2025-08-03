import { ActorSheetData, Item } from "@/schemas/actorSheetSchema";
import { Box } from "@chakra-ui/react/box";
import ItemsSectionSection from "../ItemsSection";
import { useEffect } from "react";

interface CharacterSheetFeaturesProps {
    sheet: ActorSheetData;
}

const CharacterSheetFeatures = ({ sheet }: CharacterSheetFeaturesProps) => {
    const items = sheet.items.sort((i) => i.sort);
    const classes = items.filter((i) => i.type == "class");
    const feats = items.filter((i) => i.type == "feat");
    const featsGrouped: { [k: string]: Item[] } = {};

    useEffect(() => {
        feats.forEach((feat) => {
            let featGroup = feat.system.requirements?.split(" ")[0];
            if (!featGroup) featGroup = "Other";

            if (!featsGrouped[featGroup]) featsGrouped[featGroup] = [];
            featsGrouped[featGroup].push(feat);
        });
    }, []);

    return (
        <Box className="character-sheet__panel">
            {Object.keys(featsGrouped).map((featKey, i) => (
                <ItemsSectionSection key={i} title={featKey} icon="utensils" items={featsGrouped[featKey]} />
            ))}
        </Box>
    );
};

export default CharacterSheetFeatures;
