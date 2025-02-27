import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Accelerometer } from "expo-sensors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/redux/store";
import StatsItem from "../components/StatsItem";
import { setCalories, setStepCount } from "../store/redux/stepCounterSlice";
import useGetCalories from "../hooks/useGetCalories";
import { Activities } from "../shared/types/activity.type";

const AccelerometerComponent = () => {
  const [steps, setSteps] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const {estimateCal, stepsHandler, activityTypeHandler} = useGetCalories()
  const lastMagnitudeRef = useRef(0);
  const isRunning = useSelector((state: RootState) => state.activity.isRunnig);
  const selectedActivityType = useSelector((state: RootState) => state.activity.selectedActivityType);
  const isRecord = useSelector((state: RootState) => state.activity.recordingStatus);
  const stepThreshold = 1.2; 
  const cooldown = 300;
  const lastStepTimeRef = useRef(0);
  const isSelected = useSelector(
    (state: RootState) => state.activity.selectedActivity
  );

  useEffect(() => {
    let subscription: any;

    if (isRunning) {
      subscription = Accelerometer.addListener(({ x, y, z }) => {
        const magnitude = Math.sqrt(x * x + y * y + z * z);
        const currentTime = Date.now();

        if (
          magnitude > stepThreshold &&
          currentTime - lastStepTimeRef.current > cooldown
        ) {
          setSteps((prevSteps) => prevSteps + 1);
          lastStepTimeRef.current = currentTime;
        }

        lastMagnitudeRef.current = magnitude;
      });
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isRunning]);

  const resetSteps = () => {
    setSteps(0);
  };
  useEffect(() => {
    stepsHandler(steps)
    activityTypeHandler(selectedActivityType as Activities)
  }, [steps]);

  useEffect(() => {
    dispatch(setStepCount(steps))
    dispatch(setCalories(estimateCal))
    if(!isRecord) resetSteps()
  }, [isRecord, steps, estimateCal]);



  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <StatsItem
          stateName="Steps"
          value={steps.toString()}
          style={styles.infoText}
        />
     
        <StatsItem
          stateName="Calories"
          value={!estimateCal?  `0` :estimateCal.toFixed(2).toString()}
          style={styles.infoText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
});

export default AccelerometerComponent;
