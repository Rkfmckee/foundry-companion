import { Ability } from "@/schemas/actorSheetSchema";
import { Box } from "@chakra-ui/react/box";

interface AbilityScoreBoxProps {
    name: string;
    ability: Ability;
}

const AbilityScoreBox = ({ name, ability }: AbilityScoreBoxProps) => {
    const modifier = Math.floor((ability.value - 10) / 2);

    return (
        <Box className="ability-box">
            <small>{name}</small>
            <h1>{modifier > 0 ? `+${modifier}` : modifier}</h1>
            <h4>{ability.value}</h4>
        </Box>
    );
};

export default AbilityScoreBox;
