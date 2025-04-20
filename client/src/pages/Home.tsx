import CharacterSheet from "@/components/CharacterSheet";
import NoCharacterSheetSelected from "@/components/NoCharacterSheetSelected";
import SelectCharacterSheetDrawer from "@/components/SelectCharacterSheetDrawer";
import { useState } from "react";

const Home = () => {
    const [sheetUuid, setSheetUuid] = useState("");
    const [showSelectCharacterSheetDrawer, setShowSelectCharacterSheetDrawer] = useState(false);

    return (
        <>
            {sheetUuid ? <CharacterSheet uuid={sheetUuid} /> : <NoCharacterSheetSelected onSelectCharacterSheetClicked={() => setShowSelectCharacterSheetDrawer(true)} />}

            {<SelectCharacterSheetDrawer open={showSelectCharacterSheetDrawer} onOpenChange={setShowSelectCharacterSheetDrawer} onSheetUuidSave={setSheetUuid} />}
        </>
    );
};

export default Home;
