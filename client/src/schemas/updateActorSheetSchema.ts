import { z } from "zod";
import { ActorSheetData } from "./actorSheetSchema";

export const UpdateActorSheetDataSchema = z.object({
    name: z.string(),
});
export type UpdateActorSheetData = z.infer<typeof UpdateActorSheetDataSchema>;

export const toUpdateActorSheetData = (data: ActorSheetData) => {
    return <UpdateActorSheetData>{
        name: data.name,
    };
};
