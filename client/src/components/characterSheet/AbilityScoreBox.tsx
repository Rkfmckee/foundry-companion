import { toModifier, toModifierWithProficiency } from "@/helpers/dndHelpers";
import { Ability } from "@/schemas/actorSheetSchema";
import { HStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";

interface AbilityScoreBoxProps {
    name: string;
    ability: Ability;
    proficiencyBonus: number;
}

const AbilityScoreBox = ({ name, ability, proficiencyBonus }: AbilityScoreBoxProps) => {
    return (
        <Box className="ability-box">
            <small>{name}</small>
            <h1>{ability.value}</h1>
            <HStack className="justify-content-center" gap="4">
                <div>
                    <h4>{toModifier(ability.value)}</h4>
                    <small>Mod</small>
                </div>
                <div>
                    <h4>{toModifierWithProficiency(ability.value, proficiencyBonus, ability.proficient)}</h4>
                    <small>Save</small>
                </div>
            </HStack>
        </Box>
    );
};

export default AbilityScoreBox;
