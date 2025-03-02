import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { useCallback, useEffect, useState } from "react";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

import Card from "../components/UI/Card";
import StateItem from "../components/StatsItem";
import ActivityList from "../components/Activities/ActivityList";
import { mostRecent } from "../utils/mostRecent";
import { sumCalculation, sumDuration } from "../utils/sumCalculation";
import { Activities } from "../shared/interfacse";
import useTimeFormat from "../hooks/useTimeFormat";
import { Colors } from "../constants/colors";

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

export default function Home() {
  return (
    <SQLiteProvider databaseName="fitness-data.db" onInit={initializeDB}>
      <DashboardInfo />
    </SQLiteProvider>
  );
}
const DashboardInfo = () => {
  const [progress, setProgress] = useState(0);
  const [currentSteps, setCurrentSteps] = useState(0);
  const [totalRecentCals, setTotalRecentCals] = useState(0);
  const [totalRecentElapsedTime, setTotalRecentElapsedTime] = useState("");
  const [recentActivities, setRecentActivities] = useState<Activities[]>([]);
  const [activities, setActivities] = useState<Activities[]>([]);
  const { timeFormatting, timeHandler } = useTimeFormat("");
  const { width, height } = useWindowDimensions();
  const orientation = width > height ? "landscape" : "portrait";

  const db = useSQLiteContext();
  const MAX_STEPS_VALUE = 10000;

  useEffect(() => {
    let intervalId: any;

    const animateProgress = () => {
      let currentProgress = 0;
      intervalId = setInterval(() => {
        currentProgress += 0.01;
        setProgress(currentProgress);
        let progressLimit = currentSteps / MAX_STEPS_VALUE;
        if (currentProgress >= progressLimit) {
          clearInterval(intervalId);
        }
      }, 20);
    };

    animateProgress();

    return () => clearInterval(intervalId);
  }, [currentSteps]);

  async function fetchRecentActivities() {
    const result = await db.getAllAsync("SELECT * FROM activitiesRecordsTable");
    setActivities(result as Activities[]);
  }

  useEffect(() => {
    if (activities.length) {
      setRecentActivities(mostRecent(activities.reverse()));
    }
  }, [activities]);

  useFocusEffect(
    useCallback(() => {
      fetchRecentActivities();
    }, [])
  );

  useEffect(() => {
    if (recentActivities.length) {
      let totalSteps = sumCalculation(recentActivities, "steps");
      let totalCalories = sumCalculation(recentActivities, "calories");
      timeHandler(sumDuration(recentActivities));
      setCurrentSteps(totalSteps);
      setTotalRecentCals(totalCalories);
    }
  }, [recentActivities]);

  useEffect(() => {
    setTotalRecentElapsedTime(timeFormatting);
  }, [timeFormatting]);

  let cradContent = (
    <Card>
      <View>
        <View style={style.steps}>
          <Progress.Circle
            size={150}
            color={Colors.primary400}
            borderWidth={0}
            indeterminate={false}
            animated
            thickness={10}
            unfilledColor={Colors.white}
            showsText
            progress={progress}
            formatText={(progressValue) => {
              return `${Math.round(progressValue * 100)}%`;
            }}
            strokeCap="round"
          />
          <StateItem stateName="Steps" value={currentSteps} />
        </View>
        <View style={style.info}>
          <StateItem
            stateName="Calories"
            value={totalRecentCals.toFixed(2)}
            style={style.infoText}
          />
          <StateItem
            stateName="Active time"
            value={totalRecentElapsedTime.toString()}
            style={style.infoText}
          />
        </View>
      </View>
    </Card>
  );

  if (orientation === "landscape") {
    cradContent = (
      <Card>
        <View style={style.cardWrapper}>
          <View style={style.steps}>
            <Progress.Circle
              size={orientation === "landscape" ? 110 : 150}
              color={Colors.primary400}
              borderWidth={0}
              indeterminate={false}
              animated
              thickness={10}
              unfilledColor={Colors.white}
              showsText
              progress={progress}
              formatText={(progressValue) => {
                return `${Math.round(progressValue * 100)}%`;
              }}
              strokeCap="round"
            />
              <StateItem stateName="Steps" value={currentSteps}/>
          </View>
          <View style={style.infoWrapper}>
              <StateItem
                stateName="Calories"
                value={totalRecentCals.toFixed(2)}
                style={style.infoText}
                styleWrapper={style.stateItem}
              />
              <StateItem
                stateName="Active time"
                value={totalRecentElapsedTime.toString()}
                style={style.infoText}
                styleWrapper={style.stateItem}
              />
            </View>
        </View>
      </Card>
    );
  }

  return (
    <View style={style.wrapper}>
      {cradContent}
      <View style={style.titleWrapper}>
        <Text style={style.title}>Recent Activities</Text>
      </View>
      <ActivityList items={recentActivities} />
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  steps: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
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
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  cardWrapper: {
    height: 160,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoWrapper: {
    justifyContent: "space-between",
    alignItems: "center",

  },
  stateItem: {
    padding: 10,
    paddingLeft: 30,
  }
});
