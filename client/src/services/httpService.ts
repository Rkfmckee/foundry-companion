import fvttApiClient from "@/config/fvttApiClient";
import { z } from "zod";

export const get = async <T>(url: string, schema: z.Schema<T>) => {
    var response = await fvttApiClient.get(url);
    return parseData(response.data, schema);
};

export const put = async <T>(url: string, data: any, schema?: z.Schema<T>) => {
    var response = await fvttApiClient.put(url, data);
    if (!schema) return response;
    return parseData(response.data, schema);
};

const parseData = <T>(data: any, schema: z.Schema<T>) => {
    var result = schema.safeParse(data);
    if (result.success) return result.data;
    else return undefined;
};
