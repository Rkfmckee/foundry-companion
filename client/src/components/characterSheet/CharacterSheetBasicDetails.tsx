import { ActorSheetData } from "@/schemas/actorSheetSchema";
import { HStack, Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import AbilityScoreBox from "./AbilityScoreBox";

interface CharacterSheetBasicDetailsProps {
    sheet: ActorSheetData;
}

const CharacterSheetBasicDetails = ({ sheet }: CharacterSheetBasicDetailsProps) => {
    // Get classes sorted by level descending
    const classes = sheet.items.filter((i) => i.type == "class").sort((a, b) => ((a.system.levels ?? 0) > (b.system.levels ?? 0) ? -1 : 1));
    const abilities = sheet.system.abilities;

    return (
        <Box className="character-sheet__panel">
            <Stack direction={{ base: "column", md: "row" }}>
                <Stack className="basic-details__main">
                    <h1>{sheet.name}</h1>
                    <h4>{classes.map((c, i, a) => `${c.name} ${c.system.levels}${i + 1 != a.length ? ", " : ""}`)}</h4>
                </Stack>
                {/* {sheet.system} */}
                <HStack className="ability-group">
                    <AbilityScoreBox name="Strength" ability={abilities.str} />
                    <AbilityScoreBox name="Dexterity" ability={abilities.dex} />
                    <AbilityScoreBox name="Constitution" ability={abilities.con} />
                </HStack>
                <HStack direction="row" className="ability-group">
                    <AbilityScoreBox name="Intelligence" ability={abilities.int} />
                    <AbilityScoreBox name="Wisdom" ability={abilities.wis} />
                    <AbilityScoreBox name="Charisma" ability={abilities.cha} />
                </HStack>
            </Stack>
        </Box>
    );
};

export default CharacterSheetBasicDetails;
