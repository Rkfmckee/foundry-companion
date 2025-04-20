import { Button, Heading } from "@chakra-ui/react";

const SelectCharacterSheet = () => {
    return (
        <div className="no-character-sheet">
            <Heading>No Character Sheet selected</Heading>
            <Button variant="subtle">Select a Character Sheet</Button>
        </div>
    );
};

export default SelectCharacterSheet;
