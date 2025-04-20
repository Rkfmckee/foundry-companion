import { SheetUuidKey } from "@/constants/SheetConstants";
import { IRootState } from "@/main";
import { openDrawer } from "@/slices/characterSheetSelectDrawerOpenSlice";
import { Field, Input } from "@chakra-ui/react";
import { Button, ButtonGroup, CloseButton } from "@chakra-ui/react/button";
import { Drawer } from "@chakra-ui/react/drawer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear, setUuid } from "../slices/sheetUuidSlice";

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
            <Drawer.Positioner>
                <Drawer.Content>
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
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    );
};

export default SelectCharacterSheetDrawer;
