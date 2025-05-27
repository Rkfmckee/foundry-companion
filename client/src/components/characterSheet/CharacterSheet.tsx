import { ActorSheetData } from "@/schemas/actorSheetSchema";
import { getCharacterSheet, updateCharacterSheet } from "@/services/foundryService";
import { Text } from "@chakra-ui/react/typography";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import CharacterSheetBasicDetails from "./basicDetails/CharacterSheetBasicDetails";

interface CharacterSheetProps {
    uuid: string;
}

const CharacterSheet = ({ uuid }: CharacterSheetProps) => {
    const [characterSheet, setCharacterSheet] = useState<ActorSheetData>();
    const [loadingSheet, setLoadingSheet] = useState(false);

    useEffect(() => {
        getCharacterSheetFromFoundry();
    }, [uuid]);

    const getCharacterSheetFromFoundry = async () => {
        setLoadingSheet(true);

        const sheet = await getCharacterSheet(uuid);
        setCharacterSheet(sheet);

        setLoadingSheet(false);
    };

    useEffect(() => {
        const delay = setTimeout(async () => await updateSheetOnApi(characterSheet), 500);
        return () => clearTimeout(delay);
    }, [characterSheet]);

    const updateSheetOnApi = async (sheet: ActorSheetData | undefined) => {
        if (!sheet) return;

        await updateCharacterSheet(uuid, sheet);
        console.log(sheet);
    };

    return loadingSheet ? (
        <Loading text="Loading Character Sheet" />
    ) : characterSheet ? (
        <>
            <CharacterSheetBasicDetails sheet={characterSheet} setSheet={setCharacterSheet} />
            {/* <Heading className="text-center">
                Actor UUID: {uuid}
                <br />
                <label htmlFor="sheetName">Name:</label>
                <Input id="sheetName" value={characterSheet.name} onChange={(event) => setCharacterSheet({ ...characterSheet, name: event.target.value })} />
            </Heading> */}
        </>
    ) : (
        <>
            <Text className="text-center">
                Couldn't find a Character Sheet for UUID '{uuid}'.
                <br />
                Please try a different one.
            </Text>
        </>
    );
};

export default CharacterSheet;
