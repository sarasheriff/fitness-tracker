import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedActivity: false,
  isRunnig: false,
  recordingStatus: false
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    selectActivity: (state) => {
      state.selectedActivity = true;
    },
    startRunningStatus: (state) => {
      state.isRunnig = true;
    },
    removeSelectedActivity: (state) => {
      state.selectedActivity = false;
    },
    stopRunningStatus: (state) => {
      state.isRunnig = false;
    },
    updateRecordingStatus: (state,  {payload}: PayloadAction<boolean>) => {
      state.recordingStatus = payload
    }
  },
});

export const { selectActivity, startRunningStatus, removeSelectedActivity, stopRunningStatus, updateRecordingStatus } = activitySlice.actions;
export default activitySlice.reducer;
