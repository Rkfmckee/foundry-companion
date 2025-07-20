import { z } from "zod";
import { ActorSheetData, CurrencySchema } from "./actorSheetSchema";

export const UpdateActorSheetDataSchema = z.object({
    name: z.string(),
    system: z.object({
        attributes: z.object({
            hp: z.object({
                value: z.number(),
            }),
        }),
        currency: CurrencySchema,
    }),
});
export type UpdateActorSheetData = z.infer<typeof UpdateActorSheetDataSchema>;

export const toUpdateActorSheetData = (data: ActorSheetData) => {
    return <UpdateActorSheetData>{
        name: data.name,
        system: data.system,
    };
};
