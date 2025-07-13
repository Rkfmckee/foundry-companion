import { Code } from "@chakra-ui/react/code";

type valueType = string | number | null | undefined;

interface TextWithOptionalValueChipProps {
    text: string;
    value?: valueType;
    values?: valueType[];
    units?: string | null;
    valuesSeparator?: string;
    hideIfNoValue?: boolean;
}

const TextWithOptionalValueChip = ({ text, value, values, units, valuesSeparator = " ", hideIfNoValue = false }: TextWithOptionalValueChipProps) => {
    if (hideIfNoValue && !value && !values) return;
    const valuesJoined = values?.join(valuesSeparator);

    return (
        text && (
            <Code className="proficiency-text" variant="surface">
                {text}
                {(value || valuesJoined) && (
                    <>
                        <span className="proficiency-separator">|</span>
                        {value ? value : valuesJoined}
                        {units ? ` ${units}` : ""}
                    </>
                )}
            </Code>
        )
    );
};

export default TextWithOptionalValueChip;
