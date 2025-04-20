import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};

const characterSheetSelectDrawerOpenSlice = createSlice({
    name: "showCharacterSheetSelectDrawer",
    initialState,
    reducers: {
        openDrawer: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { openDrawer } = characterSheetSelectDrawerOpenSlice.actions;
export default characterSheetSelectDrawerOpenSlice.reducer;
