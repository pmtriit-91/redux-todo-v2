import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        search: '',
        status: 'All',
        priorities: []
    },
    reducers: {
        searchFilterChange: (state, action) => {
            console.log({ action });
            state.search = action.payload
        },
        statusFilterChange: (state, action) => {
            state.status = action.payload
        },
        prioritiesFilterChange: (state, action) => {
            state.priorities = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFiltersSearch.fulfilled, (state, action) => {
                state.search = action.payload
            })
            .addCase(fetchFiltersStatus.fulfilled, (state, action) => {
                state.status = action.payload
            })
            .addCase(fetchFiltersPriorities.fulfilled, (state, action) => {
                state.priorities = action.payload
            })
    }
})

// Tạo async thunk để gửi yêu cầu tìm kiếm
export const fetchFiltersSearch = createAsyncThunk('filters/search', async (searchData) => {
    const res = await fetch('/api/filtersSearch', {
        method: 'POST',
        body: JSON.stringify(searchData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json()
    return data.filters.search
});

export const fetchFiltersStatus = createAsyncThunk('filters/status', async (status) => {
    const res = await fetch('/api/filtersStatus', {
        method: 'POST',
        body: JSON.stringify(status)
    })
    const data = await res.json()
    return data.filters.status
})

export const fetchFiltersPriorities = createAsyncThunk('filters/priorities', async (priorities, thunkAPI) => {
    //cách để lấy ra currentState
    const currentState = thunkAPI.getState()
    console.log({ currentState });

    const res = await fetch('/api/filtersPriority', {
        method: "POST",
        body: JSON.stringify(priorities)
    })
    const data = await res.json()
    return data.filters.priorities
})

export default filtersSlice