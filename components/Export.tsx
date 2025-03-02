import { View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

import { Colors } from "../constants/colors";
import { ButtonUI } from "./UI/Button";

export const Export = ({ onPress }) => {
  return (
    <View>
      <ButtonUI title="Export" onPress={onPress}>
        <FontAwesome6 name="file-csv" size={20} color={Colors.white} />
      </ButtonUI>
    </View>
  );
};
