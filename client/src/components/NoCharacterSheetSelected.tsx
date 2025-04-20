import { Button, Heading } from "@chakra-ui/react";

interface NoCharacterSheetSelectedProps {
    onSelectCharacterSheetClicked: () => void;
}

const NoCharacterSheetSelected = ({ onSelectCharacterSheetClicked }: NoCharacterSheetSelectedProps) => {
    return (
        <div className="no-character-sheet">
            <Heading>No Character Sheet selected</Heading>

            <Button variant="subtle" onClick={onSelectCharacterSheetClicked}>
                Select a Character Sheet
            </Button>
        </div>
    );
};

export default NoCharacterSheetSelected;
