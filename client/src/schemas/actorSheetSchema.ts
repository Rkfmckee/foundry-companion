import { z } from "zod";

export const ActorSheetDataSchema = z.object({
    name: z.string(),
    img: z.string(),
    system: z.object({}),
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
