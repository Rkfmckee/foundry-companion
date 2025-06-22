import RStack from "@/components/RStack";
import { getProficiencyBonus } from "@/helpers/dndHelpers";
import { ActorSheetData } from "@/schemas/actorSheetSchema";
import { Grid, GridItem } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import TraitProficiencyCode from "./TraitProficiencyCode";
import OptionalProficiencyCode from "./OptionalProficiencyCode";
import SheetSection from "./ProficienciesSection";
import SkillRow from "./SkillRow";

interface CharacterSheetAbilitiesProps {
    sheet: ActorSheetData;
    setSheet: (sheet: ActorSheetData) => void;
}

const CharacterSheetAbilities = ({ sheet }: CharacterSheetAbilitiesProps) => {
    const movement = sheet.system.attributes.movement;
    const senses = sheet.system.attributes.senses;

    return (
        <Box className="character-sheet__panel">
            <RStack gap={6}>
                <Grid className="tabs__panel-column" templateRows="auto" templateColumns="auto auto 1fr auto auto">
                    <GridItem className="text-center">
                        <strong>Prof</strong>
                    </GridItem>
                    <GridItem className="text-center">
                        <strong>Ability</strong>
                    </GridItem>
                    <GridItem className="skill-item__skills">
                        <strong>Skill</strong>
                    </GridItem>
                    <GridItem className="text-center">
                        <strong>Mod</strong>
                    </GridItem>
                    <GridItem className="text-center">
                        <strong>Pass</strong>
                    </GridItem>
                    <SkillRow skill={sheet.system.skills.acr} name="Acrobatics" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.ani} name="Animal Handling" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.arc} name="Arcana" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.ath} name="Athletics" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.dec} name="Deception" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.his} name="History" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.ins} name="Insight" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.inv} name="Investigation" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.itm} name="Intimidation" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.med} name="Medicine" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.nat} name="Nature" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.prc} name="Perception" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.prf} name="Performance" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.per} name="Persuasion" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.rel} name="Religion" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.slt} name="Sleight of Hand" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.ste} name="Stealth" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                    <SkillRow skill={sheet.system.skills.sur} name="Survival" abilities={sheet.system.abilities} proficiencyBonus={getProficiencyBonus(sheet)} />
                </Grid>
                <div className="tabs__panel-column">
                    {(movement.walk || movement.fly || movement.swim || movement.climb || movement.burrow) && (
                        <SheetSection title="Movement" icon="person-running">
                            <OptionalProficiencyCode title="Walk" value={movement.walk} units={movement.units} />
                            <OptionalProficiencyCode title="Fly" value={movement.fly} units={movement.units} hover={movement.hover} />
                            <OptionalProficiencyCode title="Swim" value={movement.swim} units={movement.units} />
                            <OptionalProficiencyCode title="Climb" value={movement.climb} units={movement.units} />
                            <OptionalProficiencyCode title="Burrow" value={movement.burrow} units={movement.units} />
                        </SheetSection>
                    )}

                    {(senses.darkvision || senses.blindsight || senses.tremorsense || senses.truesight) && (
                        <SheetSection title="Senses" icon="eye">
                            <OptionalProficiencyCode title="Darkvision" value={senses.darkvision} units={senses.units} />
                            <OptionalProficiencyCode title="Blindsight" value={senses.blindsight} units={senses.units} />
                            <OptionalProficiencyCode title="Tremorsense" value={senses.tremorsense} units={senses.units} />
                            <OptionalProficiencyCode title="Truesight" value={senses.truesight} units={senses.units} />
                        </SheetSection>
                    )}

                    {(sheet.system.traits.languages.value.length > 0 || sheet.system.traits.languages.custom) && (
                        <SheetSection title="Languages" icon="comment">
                            <TraitProficiencyCode data={sheet.system.traits.languages} />
                        </SheetSection>
                    )}

                    {(sheet.system.traits.ci.value.length > 0 || sheet.system.traits.ci.custom) && (
                        <SheetSection title="Condition immunities" icon="shield-heart">
                            <TraitProficiencyCode data={sheet.system.traits.ci} />
                        </SheetSection>
                    )}

                    {(sheet.system.traits.di.value.length > 0 || sheet.system.traits.di.custom) && (
                        <SheetSection title="Damage immunities" icon="heart">
                            <TraitProficiencyCode data={sheet.system.traits.di} />
                        </SheetSection>
                    )}

                    {(sheet.system.traits.dr.value.length > 0 || sheet.system.traits.dr.custom) && (
                        <SheetSection title="Damage resistances" icon="heart-pulse">
                            <TraitProficiencyCode data={sheet.system.traits.dr} />
                        </SheetSection>
                    )}

                    {(sheet.system.traits.dv.value.length > 0 || sheet.system.traits.dv.custom) && (
                        <SheetSection title="Damage vulnerabilities" icon="heart-crack">
                            <TraitProficiencyCode data={sheet.system.traits.dv} />
                        </SheetSection>
                    )}

                    {(sheet.system.traits.weaponProf.value.length > 0 || sheet.system.traits.weaponProf.custom) && (
                        <SheetSection title="Weapon proficiencies" icon="utensils">
                            <TraitProficiencyCode data={sheet.system.traits.weaponProf} />
                        </SheetSection>
                    )}

                    {(sheet.system.traits.armorProf.value.length > 0 || sheet.system.traits.armorProf.custom) && (
                        <SheetSection title="Armour proficiencies" icon="shield">
                            <TraitProficiencyCode data={sheet.system.traits.armorProf} />
                        </SheetSection>
                    )}
                </div>
            </RStack>
        </Box>
    );
};

export default CharacterSheetAbilities;
