import { createSlice } from '@reduxjs/toolkit';

// Initial state for reports slice
const initialState = {
  reports: [],
  currentReport: null,
  loading: false,
  error: null
};

// Create the reports slice
const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    getReportsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getReportsSuccess: (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    },
    getReportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getReportStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getReportSuccess: (state, action) => {
      state.loading = false;
      state.currentReport = action.payload;
    },
    getReportFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    generateReportStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    generateReportSuccess: (state, action) => {
      state.loading = false;
      state.reports.push(action.payload);
      state.currentReport = action.payload;
    },
    generateReportFailure: (state, action) => {
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
  getReportsStart,
  getReportsSuccess,
  getReportsFailure,
  getReportStart,
  getReportSuccess,
  getReportFailure,
  generateReportStart,
  generateReportSuccess,
  generateReportFailure,
  clearError
} = reportsSlice.actions;

export default reportsSlice.reducer;
