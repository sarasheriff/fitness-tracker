import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice';
import stepCounterReducer from './stepCounterSlice';
import activityReducer from './activitySlice'

const store = configureStore({
    reducer:{
        counter: counterReducer,
        stepCounter: stepCounterReducer,
        activity: activityReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;