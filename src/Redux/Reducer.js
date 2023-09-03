import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};
// Redux action to fetch user data
export const fetchUsers = createAsyncThunk('user/fetchUserData', async () => {
  const user = auth.currentUser; // Get the currently authenticated user
  if (user) {
    const email = user.email
    try {
      const response = await axios.get(`http://localhost:8000/users?email=${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error('User is not authenticated'); // Handle cases where the user is not authenticated
  }
});

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (email) => {
    try {
      // Send a DELETE request to your backend API to delete the user by email
      await axios.delete(`http://localhost:8000/users/${email}`);
      return email; // Return the deleted email for reference
    } catch (error) {
      throw error;
    }
  }
);

export const createJournalEntry = createAsyncThunk(
  'user/createJournalEntry',
  async (formData) => {
    try {
      const response = await axios.post('http://localhost:8000/users', formData);
      console.log('Journal entry created successfully:', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const signOutUser = createAsyncThunk('user/signOutUser', async () => {
  try {
    await signOut(auth); // Sign out the user using Firebase authentication
  } catch (error) {
    throw error;
  }
});


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        // Remove the deleted user from the state
        state.users = state.users.filter((user) => user.email !== action.payload);
      })
      .addCase(createJournalEntry.fulfilled, (state, action) => {
        // Update the state when a journal entry is created
        // Add the new journal entry to the list of existing entries
        state.users.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createJournalEntry.rejected, (state, action) => {
        // Handle the rejected action if needed (optional)
        // You can update your state here if necessary
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        // Reset user state to initial state upon sign-out
        return initialState;
      });
  },
});

export default userSlice.reducer;
export const selectAllUsers = (state) => state.users.users;
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
