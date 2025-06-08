import ProficiencyCode from "./ProficiencyCode";

interface MovementProficiencyCodeProps {
    title: string;
    value: number | null;
    units: string;
    hover?: boolean;
}

const OptionalProficiencyCode = ({ title, value, units, hover }: MovementProficiencyCodeProps) => {
    const fullTitle = hover ? `${title} (hover)` : title;

    return <>{value != null && value > 0 && <ProficiencyCode text={fullTitle} secondaryText={`${value} ${units}`} />}</>;
};

export default OptionalProficiencyCode;
