interface ModifierWithLabelProps {
    modifier: string;
    label: string;
}

const ModifierWithLabel = ({ modifier, label }: ModifierWithLabelProps) => {
    return (
        <div className="modifier-with-label">
            <h1 className="modifier-with-label__mod">{modifier}</h1>
            <small>{label}</small>
        </div>
    );
};

export default ModifierWithLabel;
