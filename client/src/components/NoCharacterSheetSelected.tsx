import { openDrawer } from "@/slices/characterSheetSelectDrawerOpenSlice";
import { Button, Heading } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const NoCharacterSheetSelected = () => {
    const dispatch = useDispatch();

    return (
        <div className="no-character-sheet">
            <Heading>No Character Sheet selected</Heading>

            <Button variant="subtle" onClick={() => dispatch(openDrawer(true))}>
                Select a Character Sheet
            </Button>
        </div>
    );
};

export default NoCharacterSheetSelected;
