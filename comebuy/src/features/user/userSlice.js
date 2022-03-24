import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    user: {},
    loading: true,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {

        }
    }
})

export const { addUser } = userSlice.actions
export default userSlice.reducer