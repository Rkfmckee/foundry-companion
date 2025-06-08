import { getAbility, toModifierWithProficiency, toModifierWithProficiencyDisplay } from "@/helpers/dndHelpers";
import { Abilities, Skill } from "@/schemas/actorSheetSchema";
import { GridItem, Separator } from "@chakra-ui/react";

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
            <GridItem className="skill-item">{skill.value}</GridItem>
            <GridItem className="skill-item text-uppercase">{skill.ability}</GridItem>
            <GridItem className="skill-item">{name}</GridItem>
            <GridItem className="skill-item">{toModifierWithProficiencyDisplay(ability.value, proficiencyBonus, skill.value)}</GridItem>
            <GridItem className="skill-item">{10 + toModifierWithProficiency(ability.value, proficiencyBonus, skill.value)}</GridItem>
        </>
    );
};

export default SkillRow;
