import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    sortType: string | null
    sortOrder: string | null
    filter: string
}

interface ISort {
    order: string | null
    type: string | null
}

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    sortType: null,
    sortOrder: null,
    filter: "",
  } as IInitialState,
  reducers: {
    setSort(state, { payload } : { payload: ISort }) {
      state.sortOrder = payload.order;
      state.sortType = payload.type;
    },
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const { setSort, setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;