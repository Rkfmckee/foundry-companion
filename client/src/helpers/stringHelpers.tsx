export const toUpperCaseFirst = (value: string | undefined) => {
    if (!value) return;
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const contains = (allValues: string[], value: string) => {
    return allValues.indexOf(value) != -1;
};
