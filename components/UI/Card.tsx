import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = ({ children, childrenStyle }: { children: React.ReactNode, childrenStyle:{} }) => {
  return (
    <View style={style.wrapper}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        // style={{ flex: 1 }}
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
    // overflow: "hidden",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#39324a", //will fix it
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  childItem: {
    paddingBottom: 20
  }
});
