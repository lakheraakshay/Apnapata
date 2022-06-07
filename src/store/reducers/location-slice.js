import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as locationApi from '../../api/location'

export const getCountry = createAsyncThunk(
    'location/country/all',
    async payload => {
        const response = await locationApi.getCountry()
        return response.data
    }
)

export const getCity = createAsyncThunk(
    'location/city/all',
    async payload => {
        const response = await locationApi.getCity(payload)
        return response.data
    }
)

export const getTowns = createAsyncThunk(
    'location/towns/all',
    async payload => {
        const response = await locationApi.getTown(payload)
        return response.data
    }
)

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        error: '',
        country: [],
        city: [],
        town: [],
    },
    extraReducers: {
        [getCountry.fulfilled]: (state, action) => {
            state.error = ''
            state.country = action.payload.data
        },
        [getCountry.rejected]: (state, action) => {
            state.error = action.error
            state.country = []
        },
        [getCity.fulfilled]: (state, action) => {
            state.error = ''
            state.city = action.payload.data
        },
        [getCity.rejected]: (state, action) => {
            state.error = action.error
            state.city = []
        },
        [getTowns.fulfilled]: (state, action) => {
            state.error = ''
            state.town = action.payload.data
        },
        [getTowns.rejected]: (state, action) => {
            state.error = action.error
            state.town = []
        },
    }
})

export const locationActions = locationSlice.actions
export default locationSlice.reducer
