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

export const withProficiency = (value: number, proficiencyBonus: number, proficiencyLevel: number) => {
    const bonus = proficiencyBonus * proficiencyLevel;
    return value + bonus;
};

export const getClasses = (sheet: ActorSheetData) => {
    return sheet.items.filter((i) => i.type == "class").sort((a, b) => ((a.system.levels ?? 0) > (b.system.levels ?? 0) ? -1 : 1));
};

export const modifierDisplay = (modifier: number) => {
    return modifier > 0 ? `+${modifier}` : modifier;
};
