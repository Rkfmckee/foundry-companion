import { ChangeEvent } from "react";

interface HitPointBarProps {
    current: number;
    currentChanged: (event: ChangeEvent<HTMLInputElement>) => void;
    max: number;
    maxChanged?: () => void;
    maxEnabled?: boolean;
    backgroundStyle?: string;
}

const HitPointBar = ({ current, currentChanged, max, maxChanged, maxEnabled, backgroundStyle }: HitPointBarProps) => {
    return (
        <div className="hitpoint-bar" style={{ background: backgroundStyle }}>
            <div className="hitpoint-bar__text">
                <input className="hitpoint-bar__text-current" type="number" value={current} onChange={currentChanged} />
                <span>/</span>
                <input className="hitpoint-bar__text-max" type="number" value={max} onChange={maxChanged} disabled={!maxEnabled} />
            </div>
        </div>
    );
};

export default HitPointBar;
