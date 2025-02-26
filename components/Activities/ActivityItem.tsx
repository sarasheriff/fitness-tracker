import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import {Ionicons, FontAwesome6} from "@expo/vector-icons";
import { Activities } from "../../shared/interfacse";

const styleMapper = {
  Running: {
    icon : <FontAwesome6 name="person-running" size={40} color={Colors.blue700}/>,
    bgColor: Colors.blue100,
    textColor: Colors.blue700
  },
  Cycling: {
    icon : <Ionicons name="bicycle" size={45} color={Colors.pink700}/>,
    bgColor: Colors.pink100,
    textColor: Colors.pink700
  },
  Walking: {
    icon : <FontAwesome6 name="person-walking" size={40} color={Colors.purpel700}/>,
    bgColor: Colors.purpel100,
    textColor: Colors.purpel700
  },
  Swimming: {
    icon : <FontAwesome6 name="person-swimming" size={40} color={Colors.peach700}/>,
    bgColor: Colors.peach100,
    textColor: Colors.peach700
  },
}
const ActivityItem = ({
  activity,
  children,
  containerStyle,
  iconWrapperStyle,
  showActName= true,
  onPress
}: {
  activity: Activities;
  children?: React.ReactNode;
  containerStyle?:any;
  iconWrapperStyle?:any;
  showActName?: boolean;
  onPress:(name: string) => void
}) => { 
  const selectActivityHandler = () => {
    onPress(activity.activityType)
  }
  return (
    <Pressable onPress={selectActivityHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.iconWrapper, {backgroundColor: styleMapper[activity.activityType]?.bgColor}, iconWrapperStyle]}>
          {styleMapper[activity.activityType]?.icon}
          {showActName && <View>
            <Text style={[styles.activityName, {color: styleMapper[activity.activityType]?.textColor, fontSize: 14, fontWeight:500}]}>
              {activity.activityType}
            </Text>
          </View>}
        </View>
        <View style={styles.activityWrapper}>
          {children}
        </View>
      </View>
    </Pressable>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  container: {
  marginRight: 10
  },
  iconWrapper: {
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  activityWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 5,
    paddingLeft: 10
  },
  activityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 5
  },
  pressed: {
    opacity: 0.5
  }
});
