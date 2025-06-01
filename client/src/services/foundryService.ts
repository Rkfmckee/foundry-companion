import { ActorSheetData, ActorSheetSchema } from "@/schemas/actorSheetSchema";
import { toUpdateActorSheetData } from "@/schemas/updateActorSheetSchema";
import { get, put } from "./httpService";

export const getCharacterSheet = async (uuid: string) => {
    var actorSheet = await get(`/get?clientId=foundry-zFYc1iuTkSP5qIkd&uuid=${uuid}`, ActorSheetSchema);

    if (actorSheet) return actorSheet.data;
    else return undefined;
};

export const updateCharacterSheet = async (uuid: string, sheet: ActorSheetData) => {
    const updateData = toUpdateActorSheetData(sheet);
    await put(`/update?clientId=foundry-zFYc1iuTkSP5qIkd&uuid=${uuid}`, updateData);
};
