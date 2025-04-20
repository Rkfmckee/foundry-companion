import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "",
};

const sheetUuidSlice = createSlice({
    name: "sheetUuid",
    initialState,
    reducers: {
        setUuid: (state, action) => {
            state.value = action.payload;
        },

        clear: (state) => {
            state.value = "";
        },
    },
});

export const { setUuid, clear } = sheetUuidSlice.actions;
export default sheetUuidSlice.reducer;
