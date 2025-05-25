import { modifierDisplay, withProficiency } from "@/helpers/dndHelpers";
import { Ability } from "@/schemas/actorSheetSchema";
import { HStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";

interface AbilityScoreBoxProps {
    name: string;
    ability: Ability;
    proficiencyBonus: number;
}

const AbilityScoreBox = ({ name, ability, proficiencyBonus }: AbilityScoreBoxProps) => {
    const modifier = Math.floor((ability.value - 10) / 2);

    return (
        <Box className="ability-box">
            <small>{name}</small>
            <h1>{ability.value}</h1>
            <HStack className="justify-content-center" gap="4">
                <div>
                    <h4>{modifierDisplay(modifier)}</h4>
                    <small>Mod</small>
                </div>
                <div>
                    <h4>{modifierDisplay(withProficiency(modifier, proficiencyBonus, ability.proficient))}</h4>
                    <small>Save</small>
                </div>
            </HStack>
        </Box>
    );
};

export default AbilityScoreBox;
