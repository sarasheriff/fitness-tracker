import { Alert, View } from "react-native";
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

const History = () => {
  const [selected, setSelected] = useState("");
  const [items, setItems] = useState<Activities[]>([
    {
      activityType: "Cycling",
      calories: 20.5,
      steps: 10,
      timer: "10:00",
      id: 1,
      date: "2025-02-10",
    },
  ]);
  const [filteredItems, setFilteredItems] = useState();
  const exportHandler = () => {
    shareFile(items);
  };

  useEffect(() => {
    if (!selected) return;
    let selectedItem = items.filter((item) => item.date === selected);
    setFilteredItems(selectedItem);
  }, [selected]);

  const clearFilterHandler = () => {
    setSelected("");
    setFilteredItems([]);
  };
  return (
    <View style={styles.container}>
      <Card>
        <Calendar
          style={{
            borderRadius: 20,
            overflow: "hidden",
          }}
          onDayPress={(day) => {
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
        <ActivityList items={selected ? filteredItems : items} />
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 300,
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
    paddingBottom: 100,
  },
  filterBtnBg: {
    backgroundColor: Colors.blue100,
    color: Colors.blue700,
  },
});
