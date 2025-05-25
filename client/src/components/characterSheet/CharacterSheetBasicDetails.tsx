import { ActorSheetData } from "@/schemas/actorSheetSchema";
import { Avatar, AvatarGroup, HStack, Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import AbilityScoreBox from "./AbilityScoreBox";
import { getProficiencyBonus } from "@/helpers/dndHelpers";

interface CharacterSheetBasicDetailsProps {
    sheet: ActorSheetData;
}

const CharacterSheetBasicDetails = ({ sheet }: CharacterSheetBasicDetailsProps) => {
    // Get classes sorted by level descending
    const classes = sheet.items.filter((i) => i.type == "class").sort((a, b) => ((a.system.levels ?? 0) > (b.system.levels ?? 0) ? -1 : 1));
    const abilities = sheet.system.abilities;
    const proficiencyBonus = getProficiencyBonus(sheet);

    return (
        <Box className="character-sheet__panel">
            <Stack direction={{ base: "column", md: "row" }}>
                <HStack className="basic-details__main">
                    <AvatarGroup size="2xl">
                        <Avatar.Root>
                            <Avatar.Image src={`${import.meta.env.VITE_FVTT_URL}/${sheet.img}`} />
                        </Avatar.Root>
                    </AvatarGroup>
                    <Stack gap={0}>
                        <h1>{sheet.name}</h1>
                        <h5>{classes.map((c, i, a) => `${c.name} ${c.system.levels}${i + 1 != a.length ? ", " : ""}`)}</h5>
                    </Stack>
                </HStack>
                {/* {sheet.system} */}
                <HStack className="ability-group">
                    <AbilityScoreBox name="Strength" ability={abilities.str} proficiencyBonus={proficiencyBonus} />
                    <AbilityScoreBox name="Dexterity" ability={abilities.dex} proficiencyBonus={proficiencyBonus} />
                    <AbilityScoreBox name="Constitution" ability={abilities.con} proficiencyBonus={proficiencyBonus} />
                </HStack>
                <HStack className="ability-group">
                    <AbilityScoreBox name="Intelligence" ability={abilities.int} proficiencyBonus={proficiencyBonus} />
                    <AbilityScoreBox name="Wisdom" ability={abilities.wis} proficiencyBonus={proficiencyBonus} />
                    <AbilityScoreBox name="Charisma" ability={abilities.cha} proficiencyBonus={proficiencyBonus} />
                </HStack>
            </Stack>
        </Box>
    );
};

export default CharacterSheetBasicDetails;
