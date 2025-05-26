import { getClasses, getProficiencyBonus } from "@/helpers/dndHelpers";
import { ActorSheetData } from "@/schemas/actorSheetSchema";
import { Avatar, AvatarGroup, HStack, Stack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import { ChangeEvent } from "react";
import AbilityScoreBox from "./AbilityScoreBox";

interface CharacterSheetBasicDetailsProps {
    sheet: ActorSheetData;
    setSheet: (sheet: ActorSheetData) => void;
}

const CharacterSheetBasicDetails = ({ sheet, setSheet }: CharacterSheetBasicDetailsProps) => {
    const hitPoints = sheet.system.attributes.hp;
    const abilities = sheet.system.abilities;

    const hitPointsPercentage = (hitPoints.value / hitPoints.max) * 100;
    const proficiencyBonus = getProficiencyBonus(sheet);

    const setHitPoints = (event: ChangeEvent<HTMLInputElement>, type: "hp" | "temp") => {
        let current = Number(event.target.value) ?? 0;
        if (current > hitPoints.max) current = hitPoints.max;
        if (current < 0) current = 0;

        const currentHp = type == "hp" ? current : hitPoints.value;
        const currentTemp = type == "temp" ? current : hitPoints.temp;

        setSheet({
            ...sheet,
            system: {
                ...sheet.system,
                attributes: {
                    ...sheet.system.attributes,
                    hp: { ...sheet.system.attributes.hp, value: currentHp, temp: currentTemp },
                },
            },
        });
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
                        <div className="row">
                            <div className="col-md-6 basic-details__stats-hp">
                                <div className="row">
                                    <div className="basic-details__stats-hp-main col p-0">
                                        <small>Hit Points</small>
                                        <div className="hitpoint-bar" style={{ background: `linear-gradient(90deg, green ${hitPointsPercentage}%, grey ${hitPointsPercentage}%)` }}>
                                            <div className="hitpoint-bar__text">
                                                <input className="hitpoint-bar__text-current" type="number" value={hitPoints.value} onChange={(event) => setHitPoints(event, "hp")} />
                                                <span>/</span>
                                                <input className="hitpoint-bar__text-max" type="number" value={hitPoints.max} disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="basic-details__stats-hp-temp col-3 p-0">
                                        <small>Temp</small>
                                        <input className="hitpoint-temp" type="number" value={hitPoints.temp ?? 0} onChange={(event) => setHitPoints(event, "temp")} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 basic-details__stats-misc"></div>
                        </div>
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
