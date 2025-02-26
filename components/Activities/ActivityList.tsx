import { FlatList, StyleSheet, Text, View } from "react-native";
import ActivityItem from "./ActivityItem";
import { Colors } from "../../constants/colors";
import { Activities } from "../../shared/interfacse";
import { calculateTimePeriod } from "../../utils/timePeriodCalculation";

const ActivityList = ({ items }: { items: Activities[] }) => {
  return (
    <FlatList
      data={items}
      style={styles.containerWrapper}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const timePeriod = new Date(item.date).toISOString()
        return (
        <ActivityItem
          activity={item}
          containerStyle={styles.wrapper}
          iconWrapperStyle={styles.iconWrapper}
          showActName={false}
        >
          <View>
            <Text style={styles.activityName}>{item.activityType}</Text>
            <Text style={styles.activityProgress}>
              {item.steps} Step/s - {item.timer} min
            </Text>
          </View>

          <Text style={styles.activityProgress}>{calculateTimePeriod(timePeriod)}</Text>
        </ActivityItem>
      )}}
    />
  );
};

export default ActivityList;

const styles = StyleSheet.create({
  containerWrapper: {
    margin: 20,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  iconWrapper: {
    flex: 1
  },
  activityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 5,
  },
  activityProgress: {
    fontSize: 14,
    color: Colors.accent500,
  },
});
