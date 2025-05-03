import { ActorSheet, ActorSheetData } from "@/schemas/characterSheetSchema";
import { getCharacterSheet } from "@/services/foundryService";
import { Input } from "@chakra-ui/react";
import { Heading, Text } from "@chakra-ui/react/typography";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";

interface CharacterSheetProps {
    uuid: string;
}

const CharacterSheet = ({ uuid }: CharacterSheetProps) => {
    const [characterSheet, setCharacterSheet] = useState<ActorSheetData>();

    useEffect(() => {
        getCharacterSheetFromFoundry();
    }, [uuid]);

    const getCharacterSheetFromFoundry = async () => {
        const sheet = await getCharacterSheet(uuid);
        setCharacterSheet(sheet);
    };

    useEffect(() => {
        const delay = setTimeout(() => updateSheetOnApi(characterSheet), 500);
        return () => clearTimeout(delay);
    }, [characterSheet]);

    const updateSheetOnApi = (sheet: ActorSheetData | undefined) => {
        console.log(`Name: ${sheet?.name}`);
    };

    return characterSheet ? (
        <>
            <Heading className="text-center">
                Actor UUID: {uuid}
                <br />
                <label htmlFor="sheetName">Name:</label>
                <Input id="sheetName" value={characterSheet.name} onChange={(event) => setCharacterSheet({ ...characterSheet, name: event.target.value })} />
            </Heading>
        </>
    ) : (
        <>
            <Text className="text-center">
                Couldn't find Character sheet for UUID {uuid}
                <br />
                Please try a different one.
            </Text>
        </>
    );
};

export default CharacterSheet;
