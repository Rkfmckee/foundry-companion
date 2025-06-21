import ProficiencyCode from "./ProficiencyCode";

interface OptionalProficiencyCodeProps {
    title: string;
    value: number | null;
    units: string;
    hover?: boolean;
}

const OptionalProficiencyCode = ({ title, value, units, hover }: OptionalProficiencyCodeProps) => {
    const fullTitle = hover ? `${title} (hover)` : title;

    return <>{value != null && value > 0 && <ProficiencyCode text={fullTitle} secondaryText={`${value} ${units}`} />}</>;
};

export default OptionalProficiencyCode;
