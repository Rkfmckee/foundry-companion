import CharacterSheet from "@/components/CharacterSheet";
import SelectCharacterSheet from "@/components/SelectCharacterSheet";
import { useState } from "react";

const Home = () => {
    const [actorUuid, setActorUuid] = useState<string>("");

    return actorUuid ? <CharacterSheet uuid={actorUuid} /> : <SelectCharacterSheet />;
};

export default Home;
