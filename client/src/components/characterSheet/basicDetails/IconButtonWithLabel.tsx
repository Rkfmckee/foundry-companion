import { VStack } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react/button";

interface IconButtonWithLabelProps {
    icon: string;
    iconClicked?: string;
    label: string;
    labelClicked?: string;
    clicked?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

const IconButtonWithLabel = ({ icon, iconClicked, label, labelClicked, onClick, clicked = false, disabled = false }: IconButtonWithLabelProps) => {
    return (
        <VStack className="icon-button-with-label" gap={0}>
            <IconButton className="icon-button-with-label__icon" rounded="full" variant="ghost" onClick={onClick} disabled={disabled}>
                {clicked ? <i className={iconClicked} /> : <i className={icon} />}
            </IconButton>

            <small>{clicked ? labelClicked : label}</small>
        </VStack>
    );
};

export default IconButtonWithLabel;
