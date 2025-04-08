import { createSlice } from '@reduxjs/toolkit';

// Initial state for transactions slice
const initialState = {
  transactions: [],
  currentTransaction: null,
  loading: false,
  error: null
};

// Create the transactions slice
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    getTransactionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTransactionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTransactionSuccess: (state, action) => {
      state.loading = false;
      state.currentTransaction = action.payload;
    },
    getTransactionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTransactionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTransactionSuccess: (state, action) => {
      state.loading = false;
      state.transactions.push(action.payload);
    },
    createTransactionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTransactionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTransactionSuccess: (state, action) => {
      state.loading = false;
      const index = state.transactions.findIndex(transaction => transaction._id === action.payload._id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
      if (state.currentTransaction && state.currentTransaction._id === action.payload._id) {
        state.currentTransaction = action.payload;
      }
    },
    updateTransactionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTransactionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTransactionSuccess: (state, action) => {
      state.loading = false;
      state.transactions = state.transactions.filter(transaction => transaction._id !== action.payload);
      if (state.currentTransaction && state.currentTransaction._id === action.payload) {
        state.currentTransaction = null;
      }
    },
    deleteTransactionFailure: (state, action) => {
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
  getTransactionsStart,
  getTransactionsSuccess,
  getTransactionsFailure,
  getTransactionStart,
  getTransactionSuccess,
  getTransactionFailure,
  createTransactionStart,
  createTransactionSuccess,
  createTransactionFailure,
  updateTransactionStart,
  updateTransactionSuccess,
  updateTransactionFailure,
  deleteTransactionStart,
  deleteTransactionSuccess,
  deleteTransactionFailure,
  clearError
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
