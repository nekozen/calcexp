import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Exp from '../types/Exp';

const expSlice = createSlice({
  name: 'exps',
  initialState: [] as Exp[],
  reducers: {
    addExp: (state, action: PayloadAction<Exp>) => {
      state.push(action.payload);
    },
    removeExp: (state, action: PayloadAction<Exp>) => {
      return state.filter((exp) => exp.id !== action.payload.id);
    },
    clearExp: (state, action: PayloadAction<null>) => {
      return [] as Exp[];
    },
  },
});

export const { addExp, removeExp, clearExp } = expSlice.actions;

export default expSlice.reducer;
