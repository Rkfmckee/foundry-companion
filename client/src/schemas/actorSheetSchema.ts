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

const SkillSchema = z.object({
    ability: z.enum(["str", "dex", "con", "int", "wis", "cha"]),
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

export const ActorSheetDataSchema = z.object({
    name: z.string(),
    img: z.string(),
    system: z.object({
        abilities: AbilitiesSchema,
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
        favorites: z.array(
            z.object({
                type: z.string(),
                id: z.string(),
                sort: z.number(),
            })
        ),
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
    }),
    items: z.array(
        z.object({
            _id: z.string(),
            name: z.string(),
            type: z.enum(["class", "feat", "spell", "weapon"]),
            system: z.object({
                levels: z.optional(z.number()),
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
