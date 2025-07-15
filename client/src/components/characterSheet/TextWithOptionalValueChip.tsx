import { Code } from "@chakra-ui/react/code";

type valueType = string | number | null | undefined;

interface TextWithOptionalValueChipProps {
    text: valueType;
    values?: valueType[];
    valuesSeparator?: string;
    valueDescriptors?: valueType[];
    valueDescriptorsSeparator?: string;
    hideIfNoValue?: boolean;
}

const TextWithOptionalValueChip = ({ text, values, valueDescriptors, valuesSeparator = " ", valueDescriptorsSeparator = " ", hideIfNoValue = false }: TextWithOptionalValueChipProps) => {
    const validValues = values?.filter(Boolean);
    if (hideIfNoValue && (!validValues || validValues.length == 0)) return;

    const valuesJoined = validValues?.join(valuesSeparator);
    const valueDescriptorsJoined = valueDescriptors?.filter(Boolean).join(valueDescriptorsSeparator);

    return (
        text && (
            <Code className="proficiency-text" variant="surface">
                {text}
                {valuesJoined && (
                    <>
                        <span className="proficiency-separator">|</span>
                        {valuesJoined}
                        {valueDescriptorsJoined ? ` ${valueDescriptorsJoined}` : ""}
                    </>
                )}
            </Code>
        )
    );
};

export default TextWithOptionalValueChip;
