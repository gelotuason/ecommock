import { RootState } from '@/lib/store';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

type UserCredentials = {
    id: number | null
    email: string | null
    username: string | null
    firstname: string | null
    lastname: string | null
    password: string | null
}

type SignupData = Omit<UserCredentials, 'id'>

type SigninData = {
    username: string | null
    password: string | null
}

type UserState = UserCredentials & {
    isAuthenticated: boolean
}

type AuthState = {
    users: UserCredentials[]
    user: UserState
    status: 'idle' | 'loading' | 'success' | 'failed'
    errors: {
        signin: string | null
        signup: string | null
    }
}

const initialState: AuthState = {
    users: [],
    user: {
        isAuthenticated: false,
        id: null,
        email: null,
        username: null,
        firstname: null,
        lastname: null,
        password: null,
    },
    status: 'idle',
    errors: {
        signin: null,
        signup: null
    }
}

export const signin = createAsyncThunk('auth/signin', async (signinData: SigninData, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const user = state.authReducer.users.find(userData => userData.username === signinData.username);

        const res = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'mor_2314',
                password: '83r5^_',
            })
        });

        await res.json();

        if (!user) return thunkAPI.rejectWithValue('No user found. Please sign up to continue.');
        if (user.password !== signinData.password) return thunkAPI.rejectWithValue('Incorrect password.');
        if (!res.ok) return thunkAPI.rejectWithValue('Failed to sign in. Please try again.');

        return user;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue('Failed to sign in. Please try again.');
    }
});

export const signup = createAsyncThunk('auth/signup', async (signupData: SignupData, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const user = state.authReducer.users.find(userData => userData.username === signupData.username);

        if (user?.email === signupData.email) return thunkAPI.rejectWithValue('Email already exists.');
        if (user?.username === signupData.username) return thunkAPI.rejectWithValue('Username already exists.');

        const res = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: signupData.email,
                username: signupData.username,
                password: signupData.password,
                name: {
                    firstname: signupData.firstname,
                    lastname: signupData.lastname,
                },
            })
        });

        if (!res.ok) return thunkAPI.rejectWithValue('Failed to sign up. Please try again.');

        const data = await res.json();
        let userId = 0;

        if (state.authReducer.users.length !== 0) {
            const latestUser = state.authReducer.users[state.authReducer.users.length - 1];
            userId = (latestUser.id ?? 0) + 1;
        } else {
            userId = data.id;
        }

        return { ...signupData, id: userId } as UserCredentials;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue('Failed to sign up. Please try again.');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signout: (state) => {
            state.user.isAuthenticated = false;
            state.status = 'idle';
        },
        clearErrors: (state) => {
            state.errors = {
                signin: null,
                signup: null,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signin.fulfilled, (state, action: PayloadAction<UserCredentials>) => {
                state.status = 'success';
                state.user.isAuthenticated = true;
                state.user = { ...action.payload, isAuthenticated: true, }
                state.errors = {
                    signin: null,
                    signup: null,
                };
            })
            .addCase(signin.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.status = 'failed';
                state.errors.signin = action.payload as string;
            })
            .addCase(signup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signup.fulfilled, (state, action: PayloadAction<UserCredentials>) => {
                state.status = 'success';
                state.users.push(action.payload);
                state.errors = {
                    signin: null,
                    signup: null,
                };
            })
            .addCase(signup.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.status = 'failed';
                state.errors.signup = action.payload as string;
            })
    }
});

export const { signout, clearErrors } = authSlice.actions;

export default authSlice.reducer;