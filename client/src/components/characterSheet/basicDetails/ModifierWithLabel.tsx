interface ModifierWithLabelProps {
    modifier: string;
    label: string;
}

const ModifierWithLabel = ({ modifier, label }: ModifierWithLabelProps) => {
    return (
        <div className="modifier-with-label">
            <h4 className="modifier-with-label__mod">{modifier}</h4>
            <small>{label}</small>
        </div>
    );
};

export default ModifierWithLabel;
