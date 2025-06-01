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

export const ActorSheetDataSchema = z.object({
    name: z.string(),
    img: z.string(),
    system: z.object({
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
                burrow: z.number(),
                climb: z.number(),
                fly: z.number(),
                swim: z.number(),
                walk: z.number(),
                units: z.string(),
                hover: z.boolean(),
            }),
            inspiration: z.boolean(),
        }),
        abilities: z.object({
            str: AbilitySchema,
            dex: AbilitySchema,
            con: AbilitySchema,
            int: AbilitySchema,
            wis: AbilitySchema,
            cha: AbilitySchema,
        }),
    }),
    items: z.array(
        z.object({
            _id: z.string(),
            name: z.string(),
            type: z.union([z.literal("class"), z.literal("feat"), z.literal("spell")]),
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
