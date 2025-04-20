import { ActorSheet } from "@/schemas/characterSheetSchema";
import { getCharacterSheet } from "@/services/foundryService";
import { Heading, Text } from "@chakra-ui/react/typography";
import { useEffect, useState } from "react";

interface CharacterSheetProps {
    uuid: string;
}

const CharacterSheet = ({ uuid }: CharacterSheetProps) => {
    const [characterSheet, setCharacterSheet] = useState<ActorSheet>();

    useEffect(() => {
        const getCharacterSheetFromFoundry = async () => {
            const sheet = await getCharacterSheet(uuid);
            setCharacterSheet(sheet);
        };

        getCharacterSheetFromFoundry();
    }, [uuid]);

    return characterSheet?.data ? (
        <>
            <Heading className="text-center">
                Actor UUID: {uuid}
                <br />
                Name: {characterSheet.data.name}
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
