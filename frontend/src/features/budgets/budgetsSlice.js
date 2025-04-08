import { createSlice } from '@reduxjs/toolkit';

// Initial state for budgets slice
const initialState = {
  budgets: [],
  currentBudget: null,
  loading: false,
  error: null
};

// Create the budgets slice
const budgetsSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    getBudgetsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBudgetsSuccess: (state, action) => {
      state.loading = false;
      state.budgets = action.payload;
    },
    getBudgetsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getBudgetStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBudgetSuccess: (state, action) => {
      state.loading = false;
      state.currentBudget = action.payload;
    },
    getBudgetFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createBudgetStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createBudgetSuccess: (state, action) => {
      state.loading = false;
      state.budgets.push(action.payload);
    },
    createBudgetFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBudgetStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateBudgetSuccess: (state, action) => {
      state.loading = false;
      const index = state.budgets.findIndex(budget => budget._id === action.payload._id);
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }
      if (state.currentBudget && state.currentBudget._id === action.payload._id) {
        state.currentBudget = action.payload;
      }
    },
    updateBudgetFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteBudgetStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteBudgetSuccess: (state, action) => {
      state.loading = false;
      state.budgets = state.budgets.filter(budget => budget._id !== action.payload);
      if (state.currentBudget && state.currentBudget._id === action.payload) {
        state.currentBudget = null;
      }
    },
    deleteBudgetFailure: (state, action) => {
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
  getBudgetsStart,
  getBudgetsSuccess,
  getBudgetsFailure,
  getBudgetStart,
  getBudgetSuccess,
  getBudgetFailure,
  createBudgetStart,
  createBudgetSuccess,
  createBudgetFailure,
  updateBudgetStart,
  updateBudgetSuccess,
  updateBudgetFailure,
  deleteBudgetStart,
  deleteBudgetSuccess,
  deleteBudgetFailure,
  clearError
} = budgetsSlice.actions;

export default budgetsSlice.reducer;
