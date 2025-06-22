import { Item } from "@/schemas/actorSheetSchema";
import { Avatar, AvatarGroup } from "@chakra-ui/react/avatar";
import { HStack } from "@chakra-ui/react/stack";
import SheetTooltip from "../../SheetTooltip";
import { Tooltip } from "@/components/ui/tooltip";
interface ItemCardProps {
    item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
    return (
        <HStack className="bottom-border py-1" gap={3}>
            <AvatarGroup size="xs">
                <Avatar.Root>
                    <Avatar.Image src={`${import.meta.env.VITE_FVTT_URL}/${item.img}`} />
                </Avatar.Root>
            </AvatarGroup>
            <span className="flex-grow-1 crop-text">{item.name}</span>

            {item.system.weight && item.system.weight.value > 0 && (
                <HStack gap={1}>
                    <span>
                        {item.system.weight?.value}
                        &nbsp;
                        {item.system.weight?.units}
                    </span>
                    <i className="fa-solid fa-weight-hanging" />
                </HStack>
            )}

            {item.system.quantity && (
                <HStack gap={1}>
                    <span>{item.system.quantity}</span>
                    <i className="fa-solid fa-hashtag" />
                </HStack>
            )}
            {item.system.uses && item.system.uses.max && (
                <span>
                    <span>{parseInt(item.system.uses?.max) - (item.system.uses?.spent ?? 0)}</span>/<span>{item.system.uses?.max ?? 0}</span>
                </span>
            )}
            {item.system.attuned && (
                <Tooltip content="Attuned" showArrow openDelay={0} closeDelay={0}>
                    <i className="fa-solid fa-sun" />
                </Tooltip>
            )}
            {item.system.equipped && (
                <Tooltip content="Equipped" showArrow openDelay={0} closeDelay={0}>
                    <i className="fa-solid fa-shield-halved" />
                </Tooltip>
            )}
        </HStack>
    );
};

export default ItemCard;
