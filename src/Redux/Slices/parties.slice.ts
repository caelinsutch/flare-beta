import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Party } from "@Models";

type PartySliceState = {
  parties?: Party[];
};

const initialState: PartySliceState = {
  parties: undefined,
};

export const partiesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    setParties: (state, action: PayloadAction<Party[]>) => {
      state.parties = action.payload;
    },
  },
});

export const { setParties } = partiesSlice.actions;

const partiesReducer = partiesSlice.reducer;

export default partiesReducer;
