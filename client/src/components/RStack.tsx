import { Stack } from "@chakra-ui/react/stack";
import { ConditionalValue } from "@chakra-ui/react/styled-system";
import { CssProperties } from "node_modules/@chakra-ui/react/dist/types/styled-system/css.types";
import { UtilityValues } from "node_modules/@chakra-ui/react/dist/types/styled-system/generated/prop-types.gen";
import { AnyString, CssVars } from "node_modules/@chakra-ui/react/dist/types/styled-system/generated/system.gen";
import { ReactNode } from "react";

interface RStackProps {
    children: ReactNode;
    className?: string;
    gap?: ConditionalValue<UtilityValues["gap"] | CssVars | CssProperties["gap"] | AnyString>;
}

// Responsive Stack
const RStack = ({ children, className, gap }: RStackProps) => {
    return (
        <Stack direction={{ base: "column", md: "row" }} className={className} gap={gap}>
            {children}
        </Stack>
    );
};

export default RStack;
