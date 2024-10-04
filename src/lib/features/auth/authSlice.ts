import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

type User = {
    username: string | null
    password?: string | null
}

type AuthState = {
    isAuthenticated: boolean
    status: 'idle' | 'loading' | 'success' | 'failed'
    error: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    status: 'idle',
    error: null,
}

export const login = createAsyncThunk('auth/login', async (loginDetails: User, { rejectWithValue }) => {
    try {
        const res = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: loginDetails.username,
                password: loginDetails.password
            })
        });

        await res.json();

        return true;
    } catch (err) {
        console.error(err);
        return rejectWithValue('Username or password is incorrect.');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // login(state, action: PayloadAction<User>) {
        //     state.isAuthenticated = true;
        //     state.user = action.payload;
        // },
        // logout
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<boolean>) => {
                state.status = 'success';
                state.isAuthenticated = action.payload;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export default authSlice.reducer;