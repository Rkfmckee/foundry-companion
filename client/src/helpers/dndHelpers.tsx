import { Abilities, Ability, ActorSheetData, Item } from "@/schemas/actorSheetSchema";

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

export const modifierDisplay = (modifier: number | undefined | null) => {
    if (!modifier) return;
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

export const getArmourClass = (sheet: ActorSheetData): { name: string; value: number } => {
    const ac = sheet.system.attributes.ac;
    const dexMod = toModifier(sheet.system.abilities.dex.value);
    const baseArmourClass = { name: "Base", value: 10 + toModifier(sheet.system.abilities.dex.value) };

    switch (ac.calc) {
        case "flat":
        case "natural":
            return { name: ac.calc, value: ac.flat ?? 0 };

        case "mage":
            return { name: "Mage Armour", value: 13 + dexMod };

        case "draconic":
            return { name: "Draconic Resilience", value: 13 + dexMod };

        case "unarmoredMonk":
            return { name: "Unarmoured Defense (Monk)", value: 10 + dexMod + toModifier(sheet.system.abilities.wis.value) };

        case "unarmoredBarb":
            return { name: "Unarmoured Defense (Barbarian)", value: 10 + dexMod + toModifier(sheet.system.abilities.con.value) };

        case "unarmoredBard":
            return { name: "Unarmoured Defense (Bard)", value: 10 + dexMod + toModifier(sheet.system.abilities.cha.value) };

        case "default":
            const armourItems = sheet.items.filter((i) => i.system.armor && i.system.equipped).map((i) => getArmourClassFromItem(i, sheet.system.abilities.dex));
            const highestArmourItem = armourItems.filter((i) => i.name && i.value > 0).sort((a, b) => (a.value > b.value ? -1 : 1))[0];
            return highestArmourItem ?? baseArmourClass;

        default:
            return baseArmourClass;
    }
};

export const getArmourClassFromItem = (item: Item, dexterity: Ability | undefined): { name: string; value: number } => {
    const dexMod = toModifier(dexterity?.value ?? 10);
    const armour = item.system.armor;

    if (!armour?.value) return { name: "", value: 0 };

    const dexMax = armour.dex;
    const dexBonus = dexMax && dexMod > dexMax ? dexMax : dexMod;
    const magicBonus = armour.magicalBonus ?? 0;

    return { name: item.name, value: armour.value + dexBonus + magicBonus };
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
