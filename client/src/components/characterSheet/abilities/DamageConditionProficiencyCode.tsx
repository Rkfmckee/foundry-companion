import { Trait } from "@/schemas/actorSheetSchema";
import ProficiencyCode from "./ProficiencyCode";
import { toUpperCaseFirst } from "@/helpers/stringHelpers";
import { fromAcronym } from "@/helpers/dndAcronyms";

interface TraitProficiencyCodeProps {
    data: Trait;
}

const TraitProficiencyCode = ({ data }: TraitProficiencyCodeProps) => {
    return (
        <>
            {data.value.map((v) => (
                <ProficiencyCode text={toUpperCaseFirst(fromAcronym(v))} />
            ))}
            {data.custom && data.custom.split(";").map((v) => <ProficiencyCode text={toUpperCaseFirst(fromAcronym(v))} />)}
        </>
    );
};

export default TraitProficiencyCode;
