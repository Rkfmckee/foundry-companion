import { Stack } from "@chakra-ui/react/stack";
import { ReactNode } from "react";

interface RStackProps {
    children: ReactNode;
    className?: string;
}

// Responsive Stack
const RStack = ({ children, className }: RStackProps) => {
    return (
        <Stack direction={{ base: "column", md: "row" }} className={className}>
            {children}
        </Stack>
    );
};

export default RStack;
