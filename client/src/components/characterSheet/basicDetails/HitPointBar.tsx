import { ChangeEvent } from "react";

interface HitPointBarProps {
    current: number;
    onCurrentChanged: (event: ChangeEvent<HTMLInputElement>) => void;
    max: number | null;
    onMaxChanged?: () => void;
    maxEnabled?: boolean;
    backgroundStyle?: string;
}

const HitPointBar = ({ current, onCurrentChanged, max, onMaxChanged, maxEnabled, backgroundStyle }: HitPointBarProps) => {
    return (
        <div className="hitpoint-bar" style={{ background: backgroundStyle }}>
            <div className="hitpoint-bar__text">
                <input className="hitpoint-bar__text-current" type="number" value={current} onChange={onCurrentChanged} />
                <span>/</span>
                <input className="hitpoint-bar__text-max" type="number" value={max ?? 0} onChange={onMaxChanged} disabled={!maxEnabled} />
            </div>
        </div>
    );
};

export default HitPointBar;
