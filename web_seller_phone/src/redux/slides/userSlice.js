import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    access_token: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { username, email, access_token } = action.payload;
            state.name = username;
            state.email = email;
            state.access_token = access_token;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
