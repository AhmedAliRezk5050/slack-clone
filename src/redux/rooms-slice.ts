import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface RoomsState {
  roomId: string | null;
}

const initialState: RoomsState = {
  roomId: null,
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    enterRoom: (state: RoomsState, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
  },
});
export const selectRooId = (state: RootState): string | null =>
  state.rooms.roomId;
export const { enterRoom } = roomsSlice.actions;
export default roomsSlice.reducer;
