import { Code } from "@chakra-ui/react/code";

interface ProfiencyCodeProps {
    text: string;
    secondaryText?: string | number;
}

const ProficiencyCode = ({ text, secondaryText }: ProfiencyCodeProps) => {
    return (
        <Code className="proficiency-text" variant="surface">
            {text}
            {secondaryText && (
                <>
                    <span className="proficiency-separator">|</span>
                    {secondaryText}
                </>
            )}
        </Code>
    );
};

export default ProficiencyCode;
