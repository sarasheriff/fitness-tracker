import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Activities } from "../../shared/types/activity.type";

const initialState = {
  selectedActivity: false,
  isRunnig: false,
  recordingStatus: false,
  selectedActivityType: "",
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
    updateRecordingStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.recordingStatus = payload;
    },
    setActivityType: (state, { payload }: PayloadAction<Activities>) => {
      state.selectedActivityType = payload;
    },
  },
});

export const {
  selectActivity,
  startRunningStatus,
  removeSelectedActivity,
  stopRunningStatus,
  updateRecordingStatus,
  setActivityType
} = activitySlice.actions;
export default activitySlice.reducer;
