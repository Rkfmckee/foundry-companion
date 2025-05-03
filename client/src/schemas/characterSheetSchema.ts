import { z } from "zod";

export const ActorSheetDataSchema = z.object({
    name: z.string(),
});

export type ActorSheetData = z.infer<typeof ActorSheetDataSchema>;

export const ActorSheetSchema = z.object({
    data: ActorSheetDataSchema,
});

export type ActorSheet = z.infer<typeof ActorSheetSchema>;
