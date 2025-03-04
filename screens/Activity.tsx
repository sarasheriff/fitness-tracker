import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

import Card from "../components/UI/Card";
import { Timer } from "../components/Timer";
import ActivityItem from "../components/Activities/ActivityItem";
import AccelerometerComponent from "../components/Accelerometer";
import { AppDispatch, RootState } from "../store/redux/store";
import { selectActivity, setActivityType } from "../store/redux/activitySlice";

import { Colors } from "../constants/colors";
import { Activities } from "../shared/types/activity.type";

const initializeDB = async (db) => {
  try {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS activitiesRecordsTable (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, date TEXT NOT NULL, timer TEXT NOT NULL, activityType TEXT NOT NULL, steps INTEGER NOT NULL, calories REAL NOT NULL);     
        `);
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

export default function Activity() {
  return (
    <SQLiteProvider databaseName="fitness-data.db" onInit={initializeDB}>
      <AddActivity />
    </SQLiteProvider>
  );
}

const AddActivity = () => {
  const dispatch: AppDispatch = useDispatch();
  const db = useSQLiteContext();
  const isActivitySelected = useSelector(
    (state: RootState) => state.activity.selectedActivity
  );
  const isRunning = useSelector((state: RootState) => state.activity.isRunnig);
  const isRecord = useSelector(
    (state: RootState) => state.activity.recordingStatus
  );
  const steps = useSelector((state: RootState) => state.stepCounter.stepCount);
  const calories = useSelector(
    (state: RootState) => state.stepCounter.calories
  );
  const count = useSelector((state: RootState) => state.counter.value);
  const [activityName, setActivityName] = useState("");
  const { width, height } = useWindowDimensions();
  const orientation = width > height ? "landscape" : "portrait";

  const onPressHandler = (activityName: Activities) => {
    if (isRecord) {
      Alert.alert(
        "Warning",
        "Another activity is currently running. Please stop it first before starting a new one!"
      );
    } else {
      dispatch(selectActivity());
      dispatch(setActivityType(activityName));
      setActivityName(activityName);
    }
  };

  const addActivityRecord = async () => {
    try {
      await db.runAsync(
        "INSERT INTO activitiesRecordsTable (date, timer, activityType, steps, calories) values (?,?,?,?,?)",
        [new Date().toString(), count, activityName, steps, calories]
      );
      Alert.alert("activity Added");
    } catch (error) {
      throw new Error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (!isRecord && count !== "00:00") addActivityRecord();
  }, [isRecord]);

  let cradContent = (
    <Card>
      <Timer />
      <View style={styles.wrapper}>
        <AccelerometerComponent />
      </View>
    </Card>
  );
  if (orientation === "landscape") {
    cradContent = (
      <Card>
        <View style={styles.cardWrapper}>
          <Timer />
          <View style={styles.wrapper}>
            <AccelerometerComponent />
          </View>
        </View>
      </Card>
    );
  }
  return (
    <View>
      {cradContent}
      <View style={[styles.titleWrapper, orientation === "landscape" && styles.titleWrapperLandscape]}>
        <Text style={styles.title}>Select Activity</Text>
      </View>
      <View style={[styles.activityWrapper, {flexWrap: orientation === "landscape" ? "nowrap" : "wrap"}]}>
        <View style={orientation === "landscape" ? styles.itemLandscape : styles.item}>
          <ActivityItem
            activity={{
              activityType: "Cycling",
              steps: 20.5,
              timer: "10:00",
              calories: 30,
              date: "2024-01-10",
            }}
            onPress={onPressHandler}
          />
        </View>
        <View style={orientation === "landscape" ? styles.itemLandscape : styles.item}>
          <ActivityItem
            activity={{
              activityType: "Walking",
              steps: 20.5,
              timer: "10:00",
              calories: 30,
              date: "2024-01-10",
            }}
            onPress={onPressHandler}
          />
        </View>
        <View style={[orientation === "landscape" ? styles.itemLandscape : styles.item, { marginTop: orientation === "landscape" ? 0 : 20 }]}>
          <ActivityItem
            activity={{
              activityType: "Running",
              steps: 20.5,
              timer: "10:00",
              calories: 30,
              date: "2024-01-10",
            }}
            onPress={onPressHandler}
          />
        </View>
        <View style={[orientation === "landscape" ? styles.itemLandscape : styles.item, { marginTop: orientation === "landscape" ? 0 : 20 }]}>
          <ActivityItem
            activity={{
              activityType: "Swimming",
              steps: 20.5,
              timer: "10:00",
              calories: 30,
              date: "2024-01-10",
            }}
            onPress={onPressHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
  },
  activityWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
  },
  item: {
    width: "50%",
  },
  itemLandscape: {
    width: "20%",
    flex: 1
  },
  infoText: {
    fontSize: 18,
    fontWeight: "500",
  },
  title: {
    fontSize: 20,
    color: Colors.black,
    fontFamily: "poppins-sans",
  },
  titleWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 20,
  },
  titleWrapperLandscape: {
    paddingBottom: 10,
  },
  cardWrapper: {
    height: 160,
  },
});
