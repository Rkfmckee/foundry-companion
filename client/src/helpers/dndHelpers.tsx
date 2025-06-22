import { Abilities, ActorSheetData } from "@/schemas/actorSheetSchema";

export const getProficiencyBonus = (sheet: ActorSheetData) => {
    const characterLevel = getClasses(sheet)
        .map((c) => c.system.levels)
        .reduce((a, b) => {
            return (a ?? 0) + (b ?? 0);
        }, 0);

    if (!characterLevel) return 0;
    if (characterLevel <= 4) return 2;
    if (characterLevel <= 8) return 3;
    if (characterLevel <= 12) return 4;
    if (characterLevel <= 16) return 5;
    return 6;
};

export const getProficiencySymbol = (proficiencyLevel: number) => {
    switch (proficiencyLevel) {
        case 0.5:
            return <div className="prof-circle__half"></div>;
        case 1:
            return <div className="prof-circle"></div>;
        case 2:
            return <div className="prof-circle__outlined"></div>;
        default:
            return "";
    }
};

export const modifierDisplay = (modifier: number) => {
    return modifier > 0 ? `+${modifier}` : modifier.toString();
};

export const toModifier = (value: number, bonus: number = 0) => {
    return Math.floor((value - 10) / 2) + bonus;
};

export const toModifierDisplay = (value: number, bonus: number = 0) => {
    return modifierDisplay(toModifier(value, bonus));
};

export const toModifierWithProficiency = (value: number, proficiencyBonus: number, proficiencyLevel: number) => {
    const bonus = proficiencyBonus * proficiencyLevel;
    return toModifier(value, bonus);
};

export const toModifierWithProficiencyDisplay = (value: number, proficiencyBonus: number, proficiencyLevel: number) => {
    const bonus = proficiencyBonus * proficiencyLevel;
    return toModifierDisplay(value, bonus);
};

export const getClasses = (sheet: ActorSheetData) => {
    // Get classes sorted by level descending
    return sheet.items.filter((i) => i.type == "class").sort((a, b) => ((a.system.levels ?? 0) > (b.system.levels ?? 0) ? -1 : 1));
};

export const getArmourClass = (sheet: ActorSheetData) => {
    const ac = sheet.system.attributes.ac;

    if (["flat", "natural"].indexOf(ac.calc) != -1) return ac.flat;
    else return 0;
};

export const getInitiativeBonus = (sheet: ActorSheetData) => {
    const initiative = sheet.system.attributes.init;
    if (!initiative.ability) initiative.ability = "dex";

    const value = getAbility(sheet.system.abilities, initiative.ability).value;
    const bonus = Number(initiative.bonus) ?? 0;

    return toModifierDisplay(value, bonus);
};

export const getAbility = (abilities: Abilities, key: string) => {
    const ability = key as keyof typeof abilities;
    return abilities[ability];
};
