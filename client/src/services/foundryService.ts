import { ActorSheetData, ActorSheetSchema } from "@/schemas/characterSheetSchema";
import { get, put } from "./httpService";

export const getCharacterSheet = async (uuid: string) => {
    var actorSheet = await get(`/get?clientId=foundry-zFYc1iuTkSP5qIkd&uuid=${uuid}`, ActorSheetSchema);
    if (actorSheet) return actorSheet.data;
    else return undefined;
};

export const updateCharacterSheet = async (uuid: string, sheet: ActorSheetData) => {
    await put(`/update?clientId=foundry-zFYc1iuTkSP5qIkd&uuid=${uuid}`, sheet);
};
