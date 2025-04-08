import { createSlice } from '@reduxjs/toolkit';

// Initial state for accounts slice
const initialState = {
  accounts: [],
  currentAccount: null,
  loading: false,
  error: null
};

// Create the accounts slice
const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    getAccountsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAccountsSuccess: (state, action) => {
      state.loading = false;
      state.accounts = action.payload;
    },
    getAccountsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAccountStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAccountSuccess: (state, action) => {
      state.loading = false;
      state.currentAccount = action.payload;
    },
    getAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAccountStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createAccountSuccess: (state, action) => {
      state.loading = false;
      state.accounts.push(action.payload);
    },
    createAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAccountStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateAccountSuccess: (state, action) => {
      state.loading = false;
      const index = state.accounts.findIndex(account => account._id === action.payload._id);
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
      if (state.currentAccount && state.currentAccount._id === action.payload._id) {
        state.currentAccount = action.payload;
      }
    },
    updateAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAccountStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteAccountSuccess: (state, action) => {
      state.loading = false;
      state.accounts = state.accounts.filter(account => account._id !== action.payload);
      if (state.currentAccount && state.currentAccount._id === action.payload) {
        state.currentAccount = null;
      }
    },
    deleteAccountFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

// Export actions and reducer
export const {
  getAccountsStart,
  getAccountsSuccess,
  getAccountsFailure,
  getAccountStart,
  getAccountSuccess,
  getAccountFailure,
  createAccountStart,
  createAccountSuccess,
  createAccountFailure,
  updateAccountStart,
  updateAccountSuccess,
  updateAccountFailure,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountFailure,
  clearError
} = accountsSlice.actions;

export default accountsSlice.reducer;
