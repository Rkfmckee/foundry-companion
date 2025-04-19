import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ColorModeProvider } from "./components/ui/color-mode.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ChakraProvider value={defaultSystem}>
            <ColorModeProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ColorModeProvider>
        </ChakraProvider>
    </StrictMode>
);
