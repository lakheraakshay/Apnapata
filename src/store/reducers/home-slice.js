import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import 

export const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        cityId: '',        
    },
    reducers: {
        updateSelectedCity: (state, action) => {
            state.cityId = action.payload;
        },
    }
})

export const homeActions = HomeSlice.actions;
export default HomeSlice.reducer;