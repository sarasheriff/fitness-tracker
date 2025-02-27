import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import Card from "../components/UI/Card";
import { useEffect, useState } from "react";
import { Colors } from "../constants/colors";
import ActivityList from "../components/Activities/ActivityList";
import { ButtonUI } from "../components/UI/Button";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Export } from "../components/Export";
import { shareFile } from "../utils/exportCSV";
import { Activities } from "../shared/interfacse";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import moment from "moment";

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

export default function History() {
  return (
    <SQLiteProvider databaseName="fitness-data.db" onInit={initializeDB}>
      <ActivitiesHistory />
    </SQLiteProvider>
  );
}

const ActivitiesHistory = () => {
  const db = useSQLiteContext();
  const [selected, setSelected] = useState("");
  const [activities, setActivities] = useState<Activities[]>([]);
  const [filteredItems, setFilteredItems] = useState<Activities[]>([]);
  const exportHandler = () => {
    shareFile(selected ? filteredItems : activities);
  };

  useEffect(() => {
    if (!selected) return;
    let selectedItem = activities.filter((item) => {
      let date = new Date(item.date).toISOString()
      let dateFormatted = moment(date).format().split("T")[0]
      return dateFormatted === selected
    });
    setFilteredItems(selectedItem);
  }, [selected]);

  const clearFilterHandler = () => {
    setSelected("");
    setFilteredItems([]);
  };

  async function fetchRecentActivities() {
    const result = await db.getAllAsync("SELECT * FROM activitiesRecordsTable");
    setActivities(result as Activities[]);
  }
  useEffect(() => {
    fetchRecentActivities();
  }, []);

  return (
    <View style={styles.container}>
      <Card childrenStyle={styles.card}>
        <Calendar
          style={{
            borderRadius: 20,
            overflow: "hidden",
          }}
          onDayPress={(day: any) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
          theme={{
            backgroundColor: Colors.primary400,
            calendarBackground: Colors.primary400,
            textSectionTitleColor: Colors.blue700,
            selectedDayBackgroundColor: Colors.blue700,
            selectedDayTextColor: "#ffffff",
            todayTextColor: Colors.blue700,
            dayTextColor: "#2d4150",
            textDisabledColor: Colors.primary700,
          }}
        />
      </Card>
      <View style={styles.buttonsContainer}>
        <ButtonUI
          onPress={clearFilterHandler}
          title="Clear"
          wrapperStyle={styles.filterBtnBg}
          textStyle={styles.filterBtnBg}
        >
          <FontAwesome6
            name="filter-circle-xmark"
            size={20}
            color={Colors.blue700}
          />
        </ButtonUI>
        <Export onPress={exportHandler} />
      </View>
      <View style={styles.activity}>
        <ActivityList items={selected ? filteredItems : activities} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 300,
  },
  card: {
    paddingBottom: 0,
    paddingTop: 20
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0,
  },
  activity: {
    paddingBottom: 60,
  },
  filterBtnBg: {
    backgroundColor: Colors.blue100,
    color: Colors.blue700,
  },
});
