import RStack from "@/components/RStack";
import { ActorSheetData, CurrencyType } from "@/schemas/actorSheetSchema";
import { Editable, HStack } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@chakra-ui/react/avatar";
import { Box } from "@chakra-ui/react/box";
import InventorySection from "./InventorySection";
import { useEffect, useState } from "react";

interface CharacterSheetInventoryProps {
    sheet: ActorSheetData;
    setSheet: (sheet: ActorSheetData) => void;
}

const CharacterSheetInventory = ({ sheet, setSheet }: CharacterSheetInventoryProps) => {
    const [value, setValue] = useState("");

    const items = sheet.items.sort((i) => i.sort);
    const weapons = items.filter((i) => i.type == "weapon");
    const equipment = items.filter((i) => i.type == "equipment");
    const consumables = items.filter((i) => i.type == "consumable");
    const tools = items.filter((i) => i.type == "tool");
    const loot = items.filter((i) => i.type == "loot");
    const containers = items.filter((i) => i.type == "container");

    useEffect(() => {
        currencyChanged("cp", value);
        setValue("");
    }, [value]);

    const currencyChanged = (type: CurrencyType, value: string) => {
        if (!value) return;
        const valueNum = Number(value);
        const valueValid = valueNum >= 0;

        const pp = type == "pp" && valueValid ? valueNum : sheet.system.currency.pp;
        const gp = type == "gp" && valueValid ? valueNum : sheet.system.currency.gp;
        const ep = type == "ep" && valueValid ? valueNum : sheet.system.currency.ep;
        const sp = type == "sp" && valueValid ? valueNum : sheet.system.currency.sp;
        const cp = type == "cp" && valueValid ? valueNum : sheet.system.currency.cp;

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
            <RStack>
                <HStack>
                    <Editable.Root>
                        <Editable.Preview>{sheet.system.currency.cp}</Editable.Preview>
                        <Editable.Input value={value} onChange={(event) => setValue(event.target.value)} />
                    </Editable.Root>
                    <AvatarGroup size="2xs" shape="square">
                        <Avatar.Root>
                            <Avatar.Image src={`${import.meta.env.VITE_FVTT_URL}/systems/dnd5e/icons/currency/gold.webp`} />
                        </Avatar.Root>
                    </AvatarGroup>
                </HStack>
            </RStack>

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
