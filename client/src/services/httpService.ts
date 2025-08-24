import fvttApiClient, { requestConfig } from "@/config/fvttApiClient";
import { z } from "zod";

export const get = async <T>(url: string, schema: z.Schema<T>) => {
    var response = await fvttApiClient.get(url, requestConfig);
    if (response.status >= 400) console.error(`${response.status}: ${response.data.error}`);

    return parseData(response.data, schema);
};

export const put = async <T>(url: string, data: any, schema?: z.Schema<T>) => {
    var response = await fvttApiClient.put(url, data, requestConfig);
    if (!schema) return response;
    return parseData(response.data, schema);
};

const parseData = <T>(data: any, schema: z.Schema<T>) => {
    var result = schema.safeParse(data);
    if (result.success) return result.data;
    else return result.error;
};
