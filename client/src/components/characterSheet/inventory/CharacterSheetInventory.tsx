import RStack from "@/components/RStack";
import { ActorSheetData, CurrencyType } from "@/schemas/actorSheetSchema";
import { Editable, HStack } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@chakra-ui/react/avatar";
import { Box } from "@chakra-ui/react/box";
import { useEffect, useState } from "react";
import InventorySection from "./InventorySection";
import EditableNumber from "@/components/EditableNumber";
import CurrencyInput from "./CurrencyInput";

interface CharacterSheetInventoryProps {
    sheet: ActorSheetData;
    setSheet: (sheet: ActorSheetData) => void;
}

const CharacterSheetInventory = ({ sheet, setSheet }: CharacterSheetInventoryProps) => {
    const items = sheet.items.sort((i) => i.sort);
    const weapons = items.filter((i) => i.type == "weapon");
    const equipment = items.filter((i) => i.type == "equipment");
    const consumables = items.filter((i) => i.type == "consumable");
    const tools = items.filter((i) => i.type == "tool");
    const loot = items.filter((i) => i.type == "loot");
    const containers = items.filter((i) => i.type == "container");

    const currencyChanged = (type: CurrencyType, value: number) => {
        const valueValid = value >= 0;

        const pp = type == "pp" && valueValid ? value : sheet.system.currency.pp;
        const gp = type == "gp" && valueValid ? value : sheet.system.currency.gp;
        const ep = type == "ep" && valueValid ? value : sheet.system.currency.ep;
        const sp = type == "sp" && valueValid ? value : sheet.system.currency.sp;
        const cp = type == "cp" && valueValid ? value : sheet.system.currency.cp;

        setSheet({
            ...sheet,
            system: {
                ...sheet.system,
                currency: {
                    ...sheet.system.currency,
                    pp: pp,
                    gp: gp,
                    ep: ep,
                    sp: sp,
                    cp: cp,
                },
            },
        });
    };

    return (
        <Box className="character-sheet__panel">
            <strong>Currency</strong>
            <HStack>
                <CurrencyInput type="pp" value={sheet.system.currency.pp} onChange={currencyChanged} />
                <CurrencyInput type="gp" value={sheet.system.currency.gp} onChange={currencyChanged} />
                <CurrencyInput type="ep" value={sheet.system.currency.ep} onChange={currencyChanged} />
                <CurrencyInput type="sp" value={sheet.system.currency.sp} onChange={currencyChanged} />
                <CurrencyInput type="cp" value={sheet.system.currency.cp} onChange={currencyChanged} />
            </HStack>

            <InventorySection title="Weapons" icon="utensils" items={weapons} />
            <InventorySection title="Equipment" icon="shield" items={equipment} />
            <InventorySection title="Consumables" icon="flask" items={consumables} />
            <InventorySection title="Tools" icon="wrench" items={tools} />
            <InventorySection title="Loot" icon="gem" items={loot} />
            <InventorySection title="Containers" icon="suitcase" items={containers} />
        </Box>
    );
};

export default CharacterSheetInventory;
