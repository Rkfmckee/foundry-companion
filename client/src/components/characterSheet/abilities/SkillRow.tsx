import { getAbility, getProficiencySymbol, toModifierWithProficiency, toModifierWithProficiencyDisplay } from "@/helpers/dndHelpers";
import { Abilities, Skill } from "@/schemas/actorSheetSchema";
import { GridItem } from "@chakra-ui/react";

interface SkillRowProps {
    skill: Skill;
    name: string;
    abilities: Abilities;
    proficiencyBonus: number;
}

const SkillRow = ({ skill, name, abilities, proficiencyBonus }: SkillRowProps) => {
    const ability = getAbility(abilities, skill.ability);

    return (
        <>
            <GridItem className="bottom-border text-center">{getProficiencySymbol(skill.value)}</GridItem>
            <GridItem className="bottom-border text-uppercase text-center">{skill.ability}</GridItem>
            <GridItem className="bottom-border">{name}</GridItem>
            <GridItem className="bottom-border text-center">{toModifierWithProficiencyDisplay(ability.value, proficiencyBonus, skill.value)}</GridItem>
            <GridItem className="bottom-border text-center">{10 + toModifierWithProficiency(ability.value, proficiencyBonus, skill.value)}</GridItem>
        </>
    );
};

export default SkillRow;
