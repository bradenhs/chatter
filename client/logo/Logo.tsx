import React from "react";
import { View, Text, StyleProp, TextStyle, ViewStyle } from "react-native";
import { colors } from "../colors";

const baseStyle: StyleProp<TextStyle> = {
  color: colors.PRIMARY_FOREGROUND,
  fontWeight: "900",
  fontSize: 40,
  fontFamily: "Avenir-Black"
};

const containerStyle: StyleProp<ViewStyle> = {
  padding: 20
};

export class Logo extends React.PureComponent {
  render() {
    return (
      <View style={containerStyle}>
        <Text style={baseStyle}>chatter</Text>
      </View>
    );
  }
}
