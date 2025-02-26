import { View } from "react-native";
import IconButton from "./UI/IconButton";
import { Colors } from "../constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
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
