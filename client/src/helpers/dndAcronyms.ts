export const fromAcronym = (acronym: string) => {
    switch (acronym) {
        // Weapons
        case "mar":
            return "Martial";
        case "sim":
            return "Simple";

        // Armour
        case "hvy":
            return "Heavy";
        case "med":
            return "Medium";
        case "lgt":
            return "Light";
        case "shl":
            return "Shields";

        default:
            return acronym;
    }
};
