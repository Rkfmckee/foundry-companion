import { ActorSheetData, ActorSheetSchema } from "@/schemas/actorSheetSchema";
import { toUpdateActorSheetData } from "@/schemas/updateActorSheetSchema";
import { get, put } from "./httpService";

export const getCharacterSheet = async (uuid: string) => {
    return await get(`/get?clientId=foundry-zFYc1iuTkSP5qIkd&uuid=${uuid}`, ActorSheetSchema);
};

export const updateCharacterSheet = async (uuid: string, sheet: ActorSheetData) => {
    const updateData = toUpdateActorSheetData(sheet);
    await put(`/update?clientId=foundry-zFYc1iuTkSP5qIkd&uuid=${uuid}`, updateData);
};
