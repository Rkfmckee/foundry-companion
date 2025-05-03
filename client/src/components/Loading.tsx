import { Spinner } from "@chakra-ui/react/spinner";
import { VStack } from "@chakra-ui/react/stack";
import { Text } from "@chakra-ui/react/typography";

interface LoadingProps {
    text?: string;
}

const Loading = ({ text }: LoadingProps) => {
    return (
        <VStack>
            <Spinner size="xl" />
            {text && <Text>{text}...</Text>}
        </VStack>
    );
};

export default Loading;
