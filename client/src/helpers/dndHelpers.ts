import { ActorSheetData } from "@/schemas/actorSheetSchema";

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

export const modifierDisplay = (modifier: number) => {
    return modifier > 0 ? `+${modifier}` : modifier.toString();
};

export const toModifier = (value: number, bonus: number = 0) => {
    const modifier = Math.floor((value - 10) / 2) + bonus;
    return modifierDisplay(modifier);
};

export const toModifierWithProficiency = (value: number, proficiencyBonus: number, proficiencyLevel: number) => {
    const bonus = proficiencyBonus * proficiencyLevel;
    const modifier = Math.floor((value - 10) / 2) + bonus;
    return modifier > 0 ? `+${modifier}` : modifier;
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

    const ability = initiative.ability as keyof typeof sheet.system.abilities;
    const value = sheet.system.abilities[ability].value;
    const bonus = Number(initiative.bonus) ?? 0;

    return toModifier(value, bonus);
};
