import { ActorSheetData } from "@/schemas/actorSheetSchema";
import { Avatar, AvatarGroup, HStack, Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import AbilityScoreBox from "./AbilityScoreBox";
import { getClasses, getProficiencyBonus } from "@/helpers/dndHelpers";

interface CharacterSheetBasicDetailsProps {
    sheet: ActorSheetData;
}

const CharacterSheetBasicDetails = ({ sheet }: CharacterSheetBasicDetailsProps) => {
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
                    <div className="crop-text">
                        <h1>{sheet.name}</h1>
                        <h5>{getClasses(sheet).map((c, i, a) => `${c.name} ${c.system.levels}${i + 1 != a.length ? ", " : ""}`)}</h5>
                    </div>
                </HStack>

                <HStack className="ability-group">
                    <AbilityScoreBox name="Strength" ability={abilities.str} proficiencyBonus={proficiencyBonus} />
                    <div className="line" />
                    <AbilityScoreBox name="Dexterity" ability={abilities.dex} proficiencyBonus={proficiencyBonus} />
                    <div className="line" />
                    <AbilityScoreBox name="Constitution" ability={abilities.con} proficiencyBonus={proficiencyBonus} />
                    <div className="line" />
                </HStack>
                <HStack className="ability-group">
                    <AbilityScoreBox name="Intelligence" ability={abilities.int} proficiencyBonus={proficiencyBonus} />
                    <div className="line" />
                    <AbilityScoreBox name="Wisdom" ability={abilities.wis} proficiencyBonus={proficiencyBonus} />
                    <div className="line" />
                    <AbilityScoreBox name="Charisma" ability={abilities.cha} proficiencyBonus={proficiencyBonus} />
                </HStack>
            </Stack>
        </Box>
    );
};

export default CharacterSheetBasicDetails;
