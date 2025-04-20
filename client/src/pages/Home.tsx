import CharacterSheet from "@/components/CharacterSheet";
import NoCharacterSheetSelected from "@/components/NoCharacterSheetSelected";
import SelectCharacterSheetDrawer from "@/components/SelectCharacterSheetDrawer";
import { SheetUuidKey } from "@/constants/SheetConstants";
import { IRootState } from "@/main";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUuid } from "../slices/sheetUuidSlice";

const Home = () => {
    const dispatch = useDispatch();
    const sheetUuid = useSelector((state: IRootState) => state.sheetUuid.value);
    const [showSelectCharacterSheetDrawer, setShowSelectCharacterSheetDrawer] = useState(false);

    useEffect(() => {
        const currentUuid = localStorage.getItem(SheetUuidKey) ?? "";
        dispatch(setUuid(currentUuid));
    }, []);

    return (
        <>
            {sheetUuid ? <CharacterSheet uuid={sheetUuid} /> : <NoCharacterSheetSelected onSelectCharacterSheetClicked={() => setShowSelectCharacterSheetDrawer(true)} />}

            {<SelectCharacterSheetDrawer open={showSelectCharacterSheetDrawer} onOpenChange={setShowSelectCharacterSheetDrawer} />}
        </>
    );
};

export default Home;
