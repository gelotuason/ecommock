import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

type User = {
    username: string | null
    password: string | null
    email?: string | null
}

type AuthState = {
    isAuthenticated: boolean
    user: User
    status: 'idle' | 'loading' | 'success' | 'failed'
    error: string | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: { username: null, password: null, email: null },
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

        return {
            username: loginDetails.username,
            email: `${loginDetails.username}@email.com`,
            success: true
        };
    } catch (err) {
        console.error(err);
        return rejectWithValue('Username or password is incorrect.');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{
                username: string | null,
                email: string | null,
                success: boolean
            }>) => {
                state.status = 'success';
                state.isAuthenticated = action.payload.success;
                state.user.username = action.payload.username;
                state.user.email = action.payload.email;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;