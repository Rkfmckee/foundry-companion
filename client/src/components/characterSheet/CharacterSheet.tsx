import { ActorSheetData } from "@/schemas/actorSheetSchema";
import { getCharacterSheet, updateCharacterSheet } from "@/services/foundryService";
import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Collapsible } from "@chakra-ui/react/collapsible";
import { Tabs } from "@chakra-ui/react/tabs";
import { Text } from "@chakra-ui/react/typography";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import RStack from "../RStack";
import CharacterSheetBasicDetails from "./basicDetails/CharacterSheetBasicDetails";
import CharacterSheetAbilities from "./abilities/CharacterSheetAbilities";

interface CharacterSheetProps {
    uuid: string;
}

const CharacterSheet = ({ uuid }: CharacterSheetProps) => {
    const [characterSheet, setCharacterSheet] = useState<ActorSheetData>();
    const [loadingSheet, setLoadingSheet] = useState(false);

    const [favouritesOpen, setFavouritesOpen] = useState(false);
    const favouritesButtonLabel = (favouritesOpen ? "Close" : "Open") + " Favourites";

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
            <RStack className="character-sheet__tabs">
                <Collapsible.Root className="favourites__panel" open={favouritesOpen} unmountOnExit lazyMount>
                    <Collapsible.Content>
                        <Box className="character-sheet__panel">List of favourites</Box>
                    </Collapsible.Content>
                </Collapsible.Root>
                <Tabs.Root className="tabs__panel" defaultValue="abilities">
                    <Tabs.List>
                        <Button onClick={() => setFavouritesOpen(!favouritesOpen)} variant="ghost">
                            {favouritesButtonLabel}
                        </Button>
                        <Tabs.Trigger value="abilities">Abilities</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="abilities">
                        <CharacterSheetAbilities sheet={characterSheet} setSheet={setCharacterSheet} />
                    </Tabs.Content>
                    <Tabs.Content value="tab2">
                        <Box className="character-sheet__panel">Tab 2 content</Box>
                    </Tabs.Content>
                    <Tabs.Content value="tab3">
                        <Box className="character-sheet__panel">Tab 3 content</Box>
                    </Tabs.Content>
                </Tabs.Root>
            </RStack>
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
