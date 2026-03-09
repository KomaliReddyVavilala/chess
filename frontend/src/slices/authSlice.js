import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { api } from "../api/client";

const initialState = {
    user : null,
    status : 'idle' , //'idle' | 'success' | 'pending' | 'error'
    error : null,
};
export const login = createAsyncThunk("/auth/login",
    async ({username , password} , thunkAPI) =>{
        try{
            const res = await api.post("/auth/login", { username , password });
            return res.data;
        } catch(err){
            return thunkAPI.rejectWithValue(err.message || "Login Failed");
        }
    },
);
export const signup = createAsyncThunk("/auth/signup",
    async({name , email , password}, thunkAPI) =>{
        try{
            const res = await api.post("/auth/signup",{name , email , password});
            return res.data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.message || "Signup Failed")
        }
    }
)
export const logout = createAsyncThunk("/auth/logout",async(_, thunkAPI ) =>{
    try{
        const res = await api.post("/auth/logout");
        return res.data;
    } catch(err) {
        return thunkAPI.rejectWithValue(err.message || "Logout Failed");
    }
})

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {},
    extraReducers : (builder) =>{
        builder.addCase();
        function pending(state){
            state.user = null;
            state.status = "pending";
            state.error = null;
        }
        function fufilled(state){
            state.status = "success";
            state.error = null;
        }
        function rejected(state,action){
            state.error = action.payload;
            state.status = "error";
            state.user = null;
        }
        builder
            .addCase(login.pending, pending)
            .addCase(login.fulfilled, fufilled)
            .addCase(login.rejected, rejected)
            .addCase(signup.pending, pending)
            .addCase(signup.fulfilled, fufilled)
            .addCase(signup.rejected, rejected);
    },
});

const authReducer = authSlice.reducer;
export { authReducer };