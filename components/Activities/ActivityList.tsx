import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import IconButton from "../UI/IconButton";
import ActivityItem from "./ActivityItem";
import { calculateTimePeriod } from "../../utils/timePeriodCalculation";

import { Activities } from "../../shared/interfacse";
import { Colors } from "../../constants/colors";

const ActivityList = ({ items }: { items: Activities[] }) => {
  const { width, height } = useWindowDimensions();
  const orientation = width > height ? "landscape" : "portrait";
  if (items.length == 0) {
    return (
      <View style={[styles.fallbackContainer, orientation === "landscape" && styles.fallbackContainerLandscape]}>
        <IconButton name="pulse" color={Colors.accent500} size={30} />
        <Text style={styles.fallbackText}>No Activities found!</Text>
      </View>
    );
  }

  const ActivityItemRendered = ({
    item,
    timePeriod,
  }: {
    item: Activities;
    timePeriod: string;
  }) => {
    return (
      <View style={{ flex: 1 }}>
        <ActivityItem
          activity={item}
          containerStyle={styles.wrapper}
          iconWrapperStyle={styles.iconWrapper}
          showActName={false}
          onPress={() => {}}
        >
          <View>
            <Text style={styles.activityName}>{item.activityType}</Text>
            <Text style={styles.activityProgress}>
              {item.steps} Steps - {item.timer}
            </Text>
          </View>

          <Text style={styles.activityProgress}>
            {calculateTimePeriod(timePeriod)}
          </Text>
        </ActivityItem>
      </View>
    );
  };

  let content = (
    <FlatList
      data={items}
      key={orientation === "landscape" ? "#" : "_"}
      numColumns={orientation === "landscape" ? 2 : 1}
      style={styles.containerWrapper}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const timePeriod = new Date(item.date).toISOString();
        return <ActivityItemRendered item={item} timePeriod={timePeriod} />;
      }}
    />
  );

  return <>{content}</>;
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
    flex: 1,
  },
  iconWrapper: {
    flex: 1,
  },
  activityName: {
    fontSize: 18,
    fontFamily: "poppins-sans-bold",
    color: Colors.black,
    marginBottom: 5,
  },
  activityProgress: {
    fontSize: 14,
    color: Colors.accent500,
    fontFamily: "poppins-sans",
  },
  fallbackContainer: {
    margin: 20,
    paddingTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackContainerLandscape: {
    paddingTop: 10,
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.accent500,
    fontFamily: "poppins-italic",
  },
});
