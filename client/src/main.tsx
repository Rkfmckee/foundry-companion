import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ColorModeProvider } from "./components/ui/color-mode.tsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import sheetUuidReducer from "./slices/sheetUuidSlice.ts";

const reduxStore = configureStore({
    reducer: {
        sheetUuid: sheetUuidReducer,
    },
});

export type IRootState = ReturnType<typeof reduxStore.getState>;

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={reduxStore}>
            <ChakraProvider value={defaultSystem}>
                <ColorModeProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ColorModeProvider>
            </ChakraProvider>
        </Provider>
    </StrictMode>
);
