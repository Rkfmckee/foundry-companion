import IconWithLabel from "./IconWithLabel";

interface SpeedDisplayProps {
    icon: string;
    value: number;
}

const SpeedDisplay = ({ icon, value }: SpeedDisplayProps) => {
    return <>{value > 0 && <IconWithLabel icon={icon} label={`${value}`} />}</>;
};

export default SpeedDisplay;
