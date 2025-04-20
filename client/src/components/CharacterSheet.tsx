import { Heading } from "@chakra-ui/react/typography";

interface CharacterSheetProps {
    uuid: string;
}

const CharacterSheet = ({ uuid }: CharacterSheetProps) => {
    return <Heading className="text-center">Actor UUID: {uuid}</Heading>;
};

export default CharacterSheet;
