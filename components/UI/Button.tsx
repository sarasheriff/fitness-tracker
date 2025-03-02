import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/colors";

export const ButtonUI = ({
  title,
  onPress,
  children,
  wrapperStyle,
  textStyle
}: {
  title: string;
  onPress: () => {};
  children: React.ReactNode;
  wrapperStyle?: string
  textStyle?: string
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={[styles.wrapper, wrapperStyle]}>
          {children}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    },
    wrapper: {
        borderWidth: 1,
        borderColor: "#ddd",
        flexDirection: "row", 
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
        backgroundColor: Colors.blue700,
        marginRight: 10

    },
    text: {
        paddingLeft: 10,
        color: "white"

    }
})