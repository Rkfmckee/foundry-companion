import { getArmourClass, getClasses, getInitiativeBonus, getProficiencyBonus, modifierDisplay } from "@/helpers/dndHelpers";
import { withinRange } from "@/helpers/numberHelpers";
import { ActorSheetData } from "@/schemas/actorSheetSchema";
import { Avatar, AvatarGroup, HStack, IconButton, Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import { ChangeEvent, useState } from "react";
import AbilityScoreBox from "./AbilityScoreBox";
import HitPointBar from "./HitPointBar";
import IconButtonWithLabel from "./IconButtonWithLabel";
import ModifierWithLabel from "./ModifierWithLabel";

interface CharacterSheetBasicDetailsProps {
    sheet: ActorSheetData;
    setSheet: (sheet: ActorSheetData) => void;
}

const CharacterSheetBasicDetails = ({ sheet, setSheet }: CharacterSheetBasicDetailsProps) => {
    const [modifyHp, setModifyHp] = useState("");

    const hitPoints = sheet.system.attributes.hp;
    const abilities = sheet.system.abilities;

    const hitPointsPercentage = (hitPoints.value / hitPoints.max) * 100;
    const proficiencyBonus = getProficiencyBonus(sheet);

    const hitPointsChanged = (event: ChangeEvent<HTMLInputElement>, type: "hp" | "temp") => {
        let current = Number(event.target.value) ?? 0;

        const hpValue = type == "hp" ? current : hitPoints.value;
        const tempValue = type == "temp" ? current : hitPoints.temp ?? 0;

        hitPointValuesChanged(hpValue, tempValue);
    };

    const hitPointValuesChanged = (hpValue?: number, tempValue?: number) => {
        if (!hpValue) hpValue = hitPoints.value;
        if (!tempValue) tempValue = hitPoints.temp ?? 0;

        setSheet({
            ...sheet,
            system: {
                ...sheet.system,
                attributes: {
                    ...sheet.system.attributes,
                    hp: { ...sheet.system.attributes.hp, value: withinRange(hpValue, 0, hitPoints.max), temp: withinRange(tempValue, 0, hitPoints.max) },
                },
            },
        });
    };

    const addHpClicked = () => {
        let current = Number(modifyHp);
        if (!current) return;

        hitPointValuesChanged(hitPoints.value + current, undefined);
        setModifyHp("");
    };

    const subtractHpClicked = () => {
        let current = Number(modifyHp);
        if (!current) return;

        const tempHp = hitPoints.temp ?? 0;
        let valueAfterTemp = current - tempHp;
        if (valueAfterTemp < 0) valueAfterTemp = 0;

        hitPointValuesChanged(hitPoints.value - valueAfterTemp, tempHp - current);
        setModifyHp("");
    };

    return (
        <Box className="character-sheet__panel">
            <Stack direction={{ base: "column", md: "row" }}>
                <div>
                    <HStack className="basic-details__identity">
                        <AvatarGroup size="2xl">
                            <Avatar.Root>
                                <Avatar.Image src={`${import.meta.env.VITE_FVTT_URL}/${sheet.img}`} />
                            </Avatar.Root>
                        </AvatarGroup>
                        <div className="crop-text">
                            <h1>{sheet.name}</h1>
                            <h5>{getClasses(sheet).map((c, i, a) => `${c.name} ${c.system.levels}${i + 1 != a.length ? ", " : ""}`)}</h5>
                        </div>
                    </HStack>
                    <div className="basic-details__stats">
                        <Stack direction={{ base: "column", md: "row" }}>
                            <div className="col-md-6 basic-details__stats-hp">
                                <div>
                                    <HStack>
                                        <div className="basic-details__stats-hp-main">
                                            <small>Hit Points</small>
                                            <HitPointBar
                                                current={hitPoints.value}
                                                onCurrentChanged={(event) => hitPointsChanged(event, "hp")}
                                                max={hitPoints.max}
                                                backgroundStyle={`linear-gradient(90deg, green ${hitPointsPercentage}%, grey ${hitPointsPercentage}%)`}
                                            />
                                        </div>
                                        <div className="basic-details__stats-hp-temp">
                                            <small>Temp</small>
                                            <input className="hitpoint-temp" type="number" value={hitPoints.temp ?? 0} onChange={(event) => hitPointsChanged(event, "temp")} />
                                        </div>
                                    </HStack>
                                </div>
                            </div>
                            <div className="col-md-6 basic-details__stats-misc">
                                <HStack className="mx-3">
                                    <div className="basic-details__stats-hp-modify">
                                        <small>Modify Hit Points</small>
                                        <HStack>
                                            <IconButton className="hitpoint-remove" rounded="full" size="sm" onClick={subtractHpClicked}>
                                                <i className="fa-solid fa-minus" />
                                            </IconButton>
                                            <input className="hitpoint-modify w-100" type="number" value={modifyHp} onChange={(event) => setModifyHp(event.target.value)} />
                                            <IconButton className="hitpoint-add" rounded="full" size="sm" onClick={addHpClicked}>
                                                <i className="fa-solid fa-plus" />
                                            </IconButton>
                                        </HStack>
                                    </div>
                                </HStack>
                            </div>
                        </Stack>
                    </div>
                    <div className="basic-details__stats">
                        <HStack gap="1em">
                            <IconButtonWithLabel
                                icon="fa-solid fa-circle-xmark"
                                iconClicked="fa-solid fa-dice-d20"
                                label="Not Inspired"
                                labelClicked="Inspired"
                                clicked={sheet.system.attributes.inspiration}
                                onClick={() =>
                                    setSheet({
                                        ...sheet,
                                        system: {
                                            ...sheet.system,
                                            attributes: {
                                                ...sheet.system.attributes,
                                                inspiration: !sheet.system.attributes.inspiration,
                                            },
                                        },
                                    })
                                }
                            />
                            <ModifierWithLabel modifier={modifierDisplay(getProficiencyBonus(sheet))} label="Proficiency" />
                            <ModifierWithLabel modifier={getArmourClass(sheet).toString()} label="Armour Class" />
                            <ModifierWithLabel modifier={getInitiativeBonus(sheet)} label="Initiative" />
                        </HStack>
                    </div>
                </div>

                <HStack className="ability-group">
                    <AbilityScoreBox name="Strength" ability={abilities.str} proficiencyBonus={proficiencyBonus} />
                    <div className="line" />
                    <AbilityScoreBox name="Dexterity" ability={abilities.dex} proficiencyBonus={proficiencyBonus} />
                    <div className="line" />
                    <AbilityScoreBox name="Constitution" ability={abilities.con} proficiencyBonus={proficiencyBonus} />
                    <div className="line" />
                </HStack>
                <HStack className="ability-group">
                    <AbilityScoreBox name="Intelligence" ability={abilities.int} proficiencyBonus={proficiencyBonus} />
                    <div className="line" />
                    <AbilityScoreBox name="Wisdom" ability={abilities.wis} proficiencyBonus={proficiencyBonus} />
                    <div className="line" />
                    <AbilityScoreBox name="Charisma" ability={abilities.cha} proficiencyBonus={proficiencyBonus} />
                </HStack>
            </Stack>
        </Box>
    );
};

export default CharacterSheetBasicDetails;
