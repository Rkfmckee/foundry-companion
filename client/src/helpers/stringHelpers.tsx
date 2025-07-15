export const toUpperCaseFirst = (value: string | undefined) => {
    if (!value) return;
    return value.charAt(0).toUpperCase() + value.slice(1);
};
