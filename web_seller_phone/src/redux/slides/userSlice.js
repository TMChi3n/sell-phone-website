import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    access_token: '',
    isAdmin: 'USER',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { username, email, access_token, isAdmin } = action.payload;
            state.name = username;
            state.email = email;
            state.access_token = access_token;
            state.isAdmin = isAdmin;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
