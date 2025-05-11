import { ActorSheetData } from "@/schemas/actorSheetSchema";
import { Heading, Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";

interface CharacterSheetBasicDetailsProps {
    sheet: ActorSheetData;
}

const CharacterSheetBasicDetails = ({ sheet }: CharacterSheetBasicDetailsProps) => {
    const classes = sheet.items.filter((i) => i.type == "class"); //.sort((a, b) => ((a.system.levels ?? 0) > (b.system.levels ?? 0) ? -1 : 1));

    return (
        <Box className="character-sheet__panel">
            <Stack>
                <Heading size="xl">{sheet.name}</Heading>
                <Heading size="md">{classes.map((c) => `${c.name} ${c.system.levels}, `)}</Heading>
            </Stack>
        </Box>
    );
};

export default CharacterSheetBasicDetails;
