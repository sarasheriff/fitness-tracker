import { createSlice } from "@reduxjs/toolkit";

interface StepState {
    stepCount: number
    calories: number
}
const initialState: StepState = {
    stepCount: 0,
    calories: 0
}
const stepCounterSlice = createSlice({
    name: "stepCounter",
    initialState,
    reducers: {
        setStepCount: (state, action) => {
            state.stepCount = action.payload
        },
        setCalories: (state, action) => {
            state.calories = action.payload
        },
        resetStepCount: (state) => {
            state.stepCount = 0
        }
    }
})

export const { setStepCount, setCalories, resetStepCount } = stepCounterSlice.actions;
export default stepCounterSlice.reducer