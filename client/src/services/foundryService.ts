import fvttApiClient from "@/config/fvttApiClient";
import { ActorSheet } from "@/schemas/characterSheetSchema";

export const getCharacterSheet = async (uuid: string) => {
    var response = await fvttApiClient.get<ActorSheet>(`/get?clientId=foundry-zFYc1iuTkSP5qIkd&uuid=${uuid}`);
    if (response.status >= 400) return undefined;
    return response.data;
};
