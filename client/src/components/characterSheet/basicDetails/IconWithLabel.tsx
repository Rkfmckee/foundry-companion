interface IconWithLabelProps {
    icon: string;
    label: string;
}

const IconWithLabel = ({ icon, label }: IconWithLabelProps) => {
    return (
        <div className="icon-with-label">
            <i className={`fa-solid ${icon}`} />
            <small>{label}</small>
        </div>
    );
};

export default IconWithLabel;
