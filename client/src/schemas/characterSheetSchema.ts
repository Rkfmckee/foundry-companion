import { z } from "zod";

export const ActorSheetSchema = z.object({
    data: z.object({
        name: z.string(),
    }),
});

export type ActorSheet = z.infer<typeof ActorSheetSchema>;
