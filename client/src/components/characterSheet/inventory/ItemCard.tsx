import FcTooltip from "@/components/FcTooltip";
import { Item } from "@/schemas/actorSheetSchema";
import { Avatar, AvatarGroup } from "@chakra-ui/react/avatar";
import { Collapsible } from "@chakra-ui/react/collapsible";
import { HStack } from "@chakra-ui/react/stack";
import DOMPurify from "isomorphic-dompurify";

interface ItemCardProps {
    item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
    return (
        <Collapsible.Root className="bottom-border py-1">
            <HStack gap={3}>
                <AvatarGroup size="xs">
                    <Avatar.Root>
                        <Avatar.Image src={`${import.meta.env.VITE_FVTT_URL}/${item.img}`} />
                    </Avatar.Root>
                </AvatarGroup>
                <Collapsible.Trigger className="flex-grow-1 crop-text text-start">
                    <span className="flex-grow-1 crop-text">{item.name}</span>
                </Collapsible.Trigger>

                {item.system.weight && item.system.weight.value > 0 && (
                    <FcTooltip text="Weight">
                        <HStack gap={1}>
                            <span>
                                {item.system.weight?.value}
                                &nbsp;
                                {item.system.weight?.units}
                            </span>
                            <i className="fa-solid fa-weight-hanging" />
                        </HStack>
                    </FcTooltip>
                )}

                {item.system.quantity && (
                    <FcTooltip text="Quantity">
                        <HStack gap={1}>
                            <span>{item.system.quantity}</span>
                            <i className="fa-solid fa-hashtag" />
                        </HStack>
                    </FcTooltip>
                )}

                {item.system.uses && item.system.uses.max && (
                    <FcTooltip text="Limited uses">
                        <span>{parseInt(item.system.uses?.max) - (item.system.uses?.spent ?? 0)}</span>/<span>{item.system.uses?.max ?? 0}</span>
                    </FcTooltip>
                )}
                {item.system.attuned && (
                    <FcTooltip text="Attuned">
                        <i className="fa-solid fa-sun" />
                    </FcTooltip>
                )}
                {item.system.equipped && (
                    <FcTooltip text="Equipped">
                        <i className="fa-solid fa-shield-halved" />
                    </FcTooltip>
                )}
            </HStack>
            <Collapsible.Content>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.system.description.value) }} className={item.system.description.value && "mt-2"} />
            </Collapsible.Content>
        </Collapsible.Root>
    );
};

export default ItemCard;
