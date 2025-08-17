import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GridState {
  state: {
    filterModel?: any;
    columnState?: any;
  } | null;
}

const initialState: GridState = {
  state: null,
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setGridState(
      state,
      action: PayloadAction<{
        filterModel?: any;
        columnState?: any;
      }>
    ) {
      state.state = action.payload;
    },
    clearGridData(state) {
      state.state = null;
    },
  },
});

export const { setGridState, clearGridData } = gridSlice.actions;
export default gridSlice.reducer;
