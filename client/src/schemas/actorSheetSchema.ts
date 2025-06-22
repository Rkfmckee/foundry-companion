import { z } from "zod";

// #region Schemas

const AbilitySchema = z.object({
    value: z.number(),
    proficient: z.number(),
    max: z.nullable(z.number()),
    bonuses: z.object({
        check: z.string(),
        save: z.string(),
    }),
});
export type Ability = z.infer<typeof AbilitySchema>;

const AbilitiesSchema = z.object({
    str: AbilitySchema,
    dex: AbilitySchema,
    con: AbilitySchema,
    int: AbilitySchema,
    wis: AbilitySchema,
    cha: AbilitySchema,
});
export type Abilities = z.infer<typeof AbilitiesSchema>;

const SkillAbilitySchema = z.enum(["str", "dex", "con", "int", "wis", "cha"]);
const SkillSchema = z.object({
    ability: SkillAbilitySchema,
    value: z.number(),
    bonuses: z.object({
        check: z.string(),
        passive: z.string(),
    }),
    roll: z.object({
        min: z.nullable(z.number()),
        max: z.nullable(z.number()),
        mode: z.number(),
    }),
});
export type Skill = z.infer<typeof SkillSchema>;

const TraitSchema = z.object({
    value: z.array(z.string()),
    custom: z.string(),
});
export type Trait = z.infer<typeof TraitSchema>;

const DamageBypassesSchema = z.array(z.enum(["ada", "mgc", "sil"]));
const DamageTraitSchema = TraitSchema.extend({
    bypasses: DamageBypassesSchema,
});

const ItemDamageSchema = z.object({
    number: z.nullable(z.number()),
    denomination: z.nullable(z.number()),
    bonus: z.optional(z.string()),
    types: z.array(z.string()),
    custom: z.object({
        enabled: z.boolean(),
        formula: z.optional(z.string()),
    }),
});
export type ItemDamage = z.infer<typeof ItemDamageSchema>;

export const ActorSheetDataSchema = z.object({
    name: z.string(),
    img: z.string(),
    system: z.object({
        abilities: AbilitiesSchema,
        skills: z.object({
            acr: SkillSchema,
            ani: SkillSchema,
            arc: SkillSchema,
            ath: SkillSchema,
            dec: SkillSchema,
            his: SkillSchema,
            ins: SkillSchema,
            itm: SkillSchema,
            inv: SkillSchema,
            med: SkillSchema,
            nat: SkillSchema,
            prc: SkillSchema,
            prf: SkillSchema,
            per: SkillSchema,
            rel: SkillSchema,
            slt: SkillSchema,
            ste: SkillSchema,
            sur: SkillSchema,
        }),
        attributes: z.object({
            hp: z.object({
                value: z.number(),
                max: z.number(),
                temp: z.nullable(z.number()),
            }),
            ac: z.object({
                calc: z.string(),
                flat: z.number(),
            }),
            init: z.object({
                ability: z.string(),
                bonus: z.string(),
            }),
            movement: z.object({
                burrow: z.nullable(z.number()),
                climb: z.nullable(z.number()),
                fly: z.nullable(z.number()),
                swim: z.nullable(z.number()),
                walk: z.nullable(z.number()),
                units: z.string(),
                hover: z.boolean(),
            }),
            senses: z.object({
                darkvision: z.nullable(z.number()),
                blindsight: z.nullable(z.number()),
                tremorsense: z.nullable(z.number()),
                truesight: z.nullable(z.number()),
                units: z.string(),
                special: z.string(),
            }),
            inspiration: z.boolean(),
        }),
        traits: z.object({
            ci: TraitSchema,
            di: DamageTraitSchema,
            dr: DamageTraitSchema,
            dv: DamageTraitSchema,
            dm: z.object({
                amount: z.object({
                    acid: z.string(),
                    bludgeoning: z.string(),
                    cold: z.string(),
                    fire: z.string(),
                    force: z.string(),
                    lightning: z.string(),
                    necrotic: z.string(),
                    piercing: z.string(),
                    poison: z.string(),
                    psychic: z.string(),
                    radiant: z.string(),
                    slashing: z.string(),
                    thunder: z.string(),
                }),
                bypasses: DamageBypassesSchema,
            }),
            languages: TraitSchema.extend({
                communication: z.object({
                    telepathy: z.object({
                        value: z.number(),
                        units: z.string(),
                    }),
                }),
            }),
            weaponProf: TraitSchema,
            armorProf: TraitSchema,
        }),
        favorites: z.array(
            z.object({
                type: z.string(),
                id: z.string(),
                sort: z.number(),
            })
        ),
    }),
    items: z.array(
        z.object({
            _id: z.string(),
            sort: z.number(),
            name: z.string(),
            type: z.enum(["class", "feat", "spell", "weapon", "consumable", "container", "equipment", "loot", "tool"]),
            properties: z.optional(z.array(z.string())),
            proficient: z.optional(z.nullable(z.number())),
            equipped: z.optional(z.boolean()),
            attuned: z.optional(z.boolean()),
            magicalBonus: z.optional(z.nullable(z.number())),
            system: z.object({
                description: z.object({
                    value: z.string(),
                }),
                levels: z.optional(z.number()),
                quantity: z.optional(z.number()),
                weight: z.optional(
                    z.object({
                        value: z.number(),
                        units: z.string(),
                    })
                ),
                range: z.optional(
                    z.object({
                        value: z.nullable(z.number().or(z.string())),
                        long: z.optional(z.nullable(z.number())),
                        units: z.string(),
                    })
                ),
                uses: z.optional(
                    z.object({
                        max: z.string(),
                        spent: z.number(),
                    })
                ),
                type: z.optional(
                    z.object({
                        value: z.enum(["simpleM", "simpleR", "martialM", "martialR", "natural", "improv", "siege", "class", ""]),
                    })
                ),
                damage: z.optional(
                    z.object({
                        base: ItemDamageSchema,
                        versatile: z.optional(ItemDamageSchema),
                    })
                ),
                armor: z.optional(
                    z.object({
                        value: z.nullable(z.number()),
                    })
                ),
                hp: z.optional(
                    z.object({
                        value: z.number(),
                        max: z.number(),
                    })
                ),
                activities: z.optional(
                    z.object({
                        attack: z.optional(
                            z.object({
                                ability: SkillAbilitySchema.or(z.enum(["none", "spellcasting", ""])),
                                bonus: z.string(),
                                flat: z.boolean(),
                                type: z.object({
                                    value: z.string(),
                                }),
                            })
                        ),
                    })
                ),
            }),
        })
    ),
});
export type ActorSheetData = z.infer<typeof ActorSheetDataSchema>;

export const ActorSheetSchema = z.object({
    data: ActorSheetDataSchema,
});
export type ActorSheet = z.infer<typeof ActorSheetSchema>;

// #endregion
