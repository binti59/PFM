import { createSlice } from '@reduxjs/toolkit';

// Initial state for goals slice
const initialState = {
  goals: [],
  currentGoal: null,
  loading: false,
  error: null
};

// Create the goals slice
const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    getGoalsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGoalsSuccess: (state, action) => {
      state.loading = false;
      state.goals = action.payload;
    },
    getGoalsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getGoalStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getGoalSuccess: (state, action) => {
      state.loading = false;
      state.currentGoal = action.payload;
    },
    getGoalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createGoalStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createGoalSuccess: (state, action) => {
      state.loading = false;
      state.goals.push(action.payload);
    },
    createGoalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateGoalStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateGoalSuccess: (state, action) => {
      state.loading = false;
      const index = state.goals.findIndex(goal => goal._id === action.payload._id);
      if (index !== -1) {
        state.goals[index] = action.payload;
      }
      if (state.currentGoal && state.currentGoal._id === action.payload._id) {
        state.currentGoal = action.payload;
      }
    },
    updateGoalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteGoalStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteGoalSuccess: (state, action) => {
      state.loading = false;
      state.goals = state.goals.filter(goal => goal._id !== action.payload);
      if (state.currentGoal && state.currentGoal._id === action.payload) {
        state.currentGoal = null;
      }
    },
    deleteGoalFailure: (state, action) => {
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
  getGoalsStart,
  getGoalsSuccess,
  getGoalsFailure,
  getGoalStart,
  getGoalSuccess,
  getGoalFailure,
  createGoalStart,
  createGoalSuccess,
  createGoalFailure,
  updateGoalStart,
  updateGoalSuccess,
  updateGoalFailure,
  deleteGoalStart,
  deleteGoalSuccess,
  deleteGoalFailure,
  clearError
} = goalsSlice.actions;

export default goalsSlice.reducer;
