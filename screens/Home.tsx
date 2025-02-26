import { View, Text, StyleSheet } from "react-native";
import Card from "../components/UI/Card";
import StateItem from "../components/StatsItem";
import ActivityList from "../components/Activities/ActivityList";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { Colors } from "../constants/colors";
import { mostRecent } from "../utils/mostRecent";
import { Activities } from "../shared/interfacse";

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
  const [activities, setActivities] =useState<Activities[]>([])
  const db = useSQLiteContext();

  useEffect(() => {
    let intervalId: any;

    const animateProgress = () => {
      let currentProgress = 0;
      intervalId = setInterval(() => {
        currentProgress += 0.01;
        setProgress(currentProgress);

        if (currentProgress >= 0.6) {
          // Stop at 60%
          clearInterval(intervalId);
        }
      }, 20);
    };

    animateProgress();

    return () => clearInterval(intervalId);
  }, []);

  async function fetchRecentActivities() {
    const result = await db.getAllAsync("SELECT * FROM activitiesRecordsTable");
    setActivities(result as Activities[])
  }

  useEffect(() => {
    fetchRecentActivities();
  }, []);

  return (
    <View style={style.wrapper}>
      <Card>
        <View style={style.steps}>
          <Progress.Circle
            size={90}
            color="#fff"
            borderWidth={2}
            indeterminate={false}
            animated
            thickness={3}
            showsText
            progress={progress}
            formatText={(progressValue) =>
              `${Math.round(progressValue * 100)}%`
            }
            strokeCap={"round"}
          />
          <StateItem stateName="Steps" value="1200" />
        </View>
        <View style={style.info}>
          {/* <StateItem
            stateName="Distance"
            value="2.5km"
            style={style.infoText}
          /> */}
          <StateItem stateName="Calories" value="284" style={style.infoText} />
          <StateItem
            stateName="Active time"
            value="32 min"
            style={style.infoText}
          />
        </View>
      </Card>
      <View style={style.titleWrapper}>
        <Text style={style.title}>
          Recent Activities
        </Text>
      </View>
      <ActivityList items={mostRecent(activities)} />
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
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "500",
  },
    title: {
      fontSize: 20,
      color: Colors.black,
    },
    titleWrapper: {
      margin: 20
    }
});
