import { SheetUuidKey } from "@/constants/SheetConstants";
import { IRootState } from "@/main";
import { openDrawer } from "@/slices/characterSheetSelectDrawerOpenSlice";
import { Image } from "@chakra-ui/react";
import { Accordion } from "@chakra-ui/react/accordion";
import { Span } from "@chakra-ui/react/box";
import { Button, ButtonGroup, CloseButton } from "@chakra-ui/react/button";
import { Code } from "@chakra-ui/react/code";
import { Drawer } from "@chakra-ui/react/drawer";
import { Field } from "@chakra-ui/react/field";
import { Input } from "@chakra-ui/react/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear, setUuid } from "../slices/sheetUuidSlice";
import actorUuidLocation from "/actor-uuid-location.png";

const SelectCharacterSheetDrawer = () => {
    let dispatch = useDispatch();
    const isDrawerOpen = useSelector((state: IRootState) => state.characterSheetSelectDrawerOpen.value);
    const [sheetUuid, setSheetUuid] = useState("");

    useEffect(() => {
        const currentUuid = localStorage.getItem(SheetUuidKey) ?? "";
        dispatch(setUuid(currentUuid));
        setSheetUuid(currentUuid);
    }, []);

    const saveClicked = () => {
        if (!sheetUuid) return;

        dispatch(setUuid(sheetUuid));
        localStorage.setItem(SheetUuidKey, sheetUuid);

        dispatch(openDrawer(false));
    };

    const clearClicked = () => {
        setSheetUuid("");
        dispatch(clear());
        localStorage.removeItem(SheetUuidKey);
    };

    return (
        <Drawer.Root open={isDrawerOpen} onOpenChange={(details) => dispatch(openDrawer(details.open))} size="md">
            <Drawer.Backdrop />
            <Drawer.Positioner padding="4">
                <Drawer.Content rounded="lg">
                    <Drawer.Header>
                        <Drawer.CloseTrigger asChild pos="initial">
                            <CloseButton />
                        </Drawer.CloseTrigger>
                        <Drawer.Title flex="1" fontSize="lg" className="my-auto">
                            Select Character Sheet
                        </Drawer.Title>
                        <ButtonGroup>
                            <Button onClick={clearClicked} variant="outline">
                                Clear
                            </Button>
                            <Button onClick={saveClicked}>Save</Button>
                        </ButtonGroup>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Field.Root>
                            <Field.Label>Enter your Character Sheet's UUID:</Field.Label>
                            <Input value={sheetUuid} onChange={(event) => setSheetUuid(event.target.value)} />
                            <Field.ErrorText />
                        </Field.Root>

                        <Accordion.Root variant="subtle" collapsible>
                            <Accordion.Item value="where-is-this">
                                <div className="where-is-this">
                                    <Accordion.ItemTrigger>
                                        <Span flex="1">Where do I find this?</Span>
                                        <Accordion.ItemIndicator />
                                    </Accordion.ItemTrigger>
                                    <Accordion.ItemContent>
                                        <Accordion.ItemBody>
                                            <ul>
                                                <li>Open your character sheet in Foundry.</li>
                                                <li>Look for the icons in the top-right corner.</li>
                                                <li>
                                                    Click the left-most icon in that list.
                                                    <ul>
                                                        <li>
                                                            Hovering it should say <Code>Copy Document UUID</Code>.
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <Image src={actorUuidLocation} alt="Actor UUID location" className="mx-auto" />
                                        </Accordion.ItemBody>
                                    </Accordion.ItemContent>
                                </div>
                            </Accordion.Item>
                        </Accordion.Root>
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    );
};

export default SelectCharacterSheetDrawer;
