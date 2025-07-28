import { Trait } from "@/schemas/actorSheetSchema";
import TextWithOptionalValueChip from "../TextWithOptionalValueChip";
import { toUpperCaseFirst } from "@/helpers/stringHelpers";
import { fromAcronym } from "@/helpers/dndAcronyms";

interface TraitChipsProps {
    data: Trait;
}

const TraitChips = ({ data }: TraitChipsProps) => {
    return (
        <>
            {data.value.map((v, i) => (
                <TextWithOptionalValueChip key={i} text={toUpperCaseFirst(fromAcronym(v))} />
            ))}
            {data.custom && data.custom.split(";").map((v, i) => <TextWithOptionalValueChip key={i} text={toUpperCaseFirst(fromAcronym(v))} />)}
        </>
    );
};

export default TraitChips;
