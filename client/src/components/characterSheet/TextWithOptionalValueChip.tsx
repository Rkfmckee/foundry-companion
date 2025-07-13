import { Code } from "@chakra-ui/react/code";

interface TextWithOptionalValueChipProps {
    text: string;
    value?: string | number | null;
    units?: string | null;
    hideIfNoValue?: boolean;
}

const TextWithOptionalValueChip = ({ text, value, units, hideIfNoValue = false }: TextWithOptionalValueChipProps) => {
    if (hideIfNoValue && !value) return;

    return (
        text && (
            <Code className="proficiency-text" variant="surface">
                {text}
                {value && (
                    <>
                        <span className="proficiency-separator">|</span>
                        {value} {units && units}
                    </>
                )}
            </Code>
        )
    );
};

export default TextWithOptionalValueChip;
