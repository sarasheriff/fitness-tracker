import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../constants/colors";

const Steps = ({
  style,
  stateName,
  value,
  styleWrapper
}: {
  style?: any;
  styleWrapper?: any;
  stateName: string;
  value: string | number;
}) => {
  return (
    <View style={styleWrapper}>
      <View>
        <Text style={[styles.value, style]}>{value}</Text>
      </View>
      <View>
        <Text style={styles.text}>{stateName}</Text>
      </View>
    </View>
  );
};

export default Steps;

const styles = StyleSheet.create({
  value: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "poppins-sans"
  },
  text: {
    color: Colors.pink100,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "poppins-sans"
  },
});
