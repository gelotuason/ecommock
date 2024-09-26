import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
    id: number
    name: string
}

type AuthState = {
    isAuthenticated: boolean
    user: User
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        id: 1,
        name: 'Oturan'
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        // logout
    }
});

export const { login } = authSlice.actions;
export default authSlice.reducer;