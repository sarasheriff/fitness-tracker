import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const Card = ({ children, childrenStyle }: { children: React.ReactNode, childrenStyle:{} }) => {
  return (
    <View style={style.wrapper}>
      <LinearGradient
        colors={[Colors.blue200, Colors.blue300, Colors.blue800]}
        style={style.wrapper}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}

      >
        <View style={[style.childItem, childrenStyle]}>{children}</View>
      </LinearGradient>
    </View>
  );
};

export default Card;

const style = StyleSheet.create({
  wrapper: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#39324a",
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  childItem: {
    paddingBottom: 20
  }
});
