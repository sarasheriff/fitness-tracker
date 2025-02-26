import { useEffect, useRef, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/redux/store";
import IconButton from "./UI/IconButton";
import { Colors } from "../constants/colors";
import {
  removeSelectedActivity,
  startRunningStatus,
  stopRunningStatus,
  updateRecordingStatus,
} from "../store/redux/activitySlice";
import { setValue } from "../store/redux/counterSlice";

export const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const count = useSelector((state: RootState) => state.counter.value);
   const isRunning = useSelector((state: RootState) => state.activity.isRunnig);
   const isRecord = useSelector((state: RootState) => state.activity.recordingStatus);
  const isSelected = useSelector(
    (state: RootState) => state.activity.selectedActivity
  );
  const dispatch: AppDispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true);
    dispatch(startRunningStatus());
    dispatch(updateRecordingStatus(true))
  };

  const pauseTimer = () => {
    setIsActive(false);
    dispatch(stopRunningStatus());
  };

  const stopTimer = () => {
    dispatch(setValue(formatTime(seconds)))
    setSeconds(0);
    setIsActive(false);
    dispatch(removeSelectedActivity());
    dispatch(stopRunningStatus());
    dispatch(updateRecordingStatus(false))
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const startRecordHandler = () => {
    !isSelected
      ? Alert.alert("Invalid", "Please select activity first")
      : startTimer();
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
      </View>
      <View style={styles.iconsWrapper}>
        <View style={styles.icon}>
          {!isActive ? (
            <IconButton
              onPress={startRecordHandler}
              name="play"
              color={Colors.white}
              size={30}
            />
          ) : (
            <IconButton
              onPress={pauseTimer}
              name="pause"
              color={Colors.white}
              size={30}
            />
          )}
        </View>
        <View style={[styles.icon, styles.stopIcon]}>
          <IconButton
            onPress={stopTimer}
            name="stop"
            color={Colors.white}
            size={30}
            isDisabled={!isRecord}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    padding: 20,
  },
  iconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: Colors.blue700,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  stopIcon: {
    backgroundColor: Colors.pink700,
  },
  timer: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
});
