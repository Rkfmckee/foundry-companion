import CharacterSheet from "@/components/CharacterSheet";
import NoCharacterSheetSelected from "@/components/NoCharacterSheetSelected";
import { IRootState } from "@/main";
import { useSelector } from "react-redux";

const Home = () => {
    const sheetUuid = useSelector((state: IRootState) => state.sheetUuid.value);

    return <>{sheetUuid ? <CharacterSheet uuid={sheetUuid} /> : <NoCharacterSheetSelected />}</>;
};

export default Home;
