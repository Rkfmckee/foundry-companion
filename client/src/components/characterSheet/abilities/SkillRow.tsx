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
            <GridItem className="skill-item text-center">{getProficiencySymbol(skill.value)}</GridItem>
            <GridItem className="skill-item text-uppercase text-center">{skill.ability}</GridItem>
            <GridItem className="skill-item">{name}</GridItem>
            <GridItem className="skill-item text-center">{toModifierWithProficiencyDisplay(ability.value, proficiencyBonus, skill.value)}</GridItem>
            <GridItem className="skill-item text-center">{10 + toModifierWithProficiency(ability.value, proficiencyBonus, skill.value)}</GridItem>
        </>
    );
};

export default SkillRow;
