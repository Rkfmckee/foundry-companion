import { toUpperCaseFirst } from "./stringHelpers";

export const fromAcronym = (acronym: string | undefined) => {
    switch (acronym) {
        // Weapons
        case "mar":
            return "Martial";
        case "sim":
            return "Simple";
        case "simpleM":
            return "Simple Melee";
        case "simpleR":
            return "Simple Ranged";
        case "martialM":
            return "Martial Melee";
        case "martialR":
            return "Martial Ranged";
        case "improv":
            return "Improvised";

        // Weapon properties
        case "ada":
            return "Adamantine";
        case "amm":
            return "Ammunition";
        case "fin":
            return "Finesse";
        case "fir":
            return "Firearm";
        case "foc":
            return "Focus";
        case "hvy":
            return "Heavy";
        case "lgt":
            return "Light";
        case "lod":
            return "Loading";
        case "mgc":
            return "Magical";
        case "rch":
            return "Reach";
        case "rel":
            return "Reload";
        case "ret":
            return "Returning";
        case "sil":
            return "Silvered";
        case "spc":
            return "Special";
        case "thr":
            return "Thrown";
        case "two":
            return "Two-Handed";
        case "ver":
            return "Versatile";

        // Armour (Light/Heavy handled in Weapon properties)
        case "med":
            return "Medium";
        case "shl":
            return "Shields";

        // Rarity
        case "veryRare":
            return "Very Rare";

        // Currency
        case "pp":
            return "Platinum";
        case "gp":
            return "Gold";
        case "ep":
            return "Electrum";
        case "sp":
            return "Silver";
        case "cp":
            return "Copper";

        default:
            return toUpperCaseFirst(acronym);
    }
};
