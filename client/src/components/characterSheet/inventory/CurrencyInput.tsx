import EditableNumber from "@/components/EditableNumber";
import { fromAcronym } from "@/helpers/dndAcronyms";
import { CurrencyType } from "@/schemas/actorSheetSchema";
import { Avatar, AvatarGroup } from "@chakra-ui/react/avatar";
import { HStack } from "@chakra-ui/react/stack";

interface CurrencyInputProps {
    type: CurrencyType;
    value: number;
    onChange: (type: CurrencyType, value: number) => void;
}

const CurrencyInput = ({ type, value, onChange }: CurrencyInputProps) => {
    return (
        <HStack>
            <EditableNumber value={value} onChange={(value) => onChange(type, value)} width="100%" />
            {/* {type} */}
            <AvatarGroup size="2xs" shape="square">
                <Avatar.Root>
                    <Avatar.Image src={`${import.meta.env.VITE_FVTT_URL}/systems/dnd5e/icons/currency/${fromAcronym(type)?.toLowerCase()}.webp`} />
                </Avatar.Root>
            </AvatarGroup>
        </HStack>
    );
};

export default CurrencyInput;
