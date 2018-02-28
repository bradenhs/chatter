import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";
import { Svg } from "expo";

const headerStyle: ViewStyle = {
  paddingTop: 40,
  paddingBottom: 20,
  left: 0,
  right: 0,
  position: "absolute",
  backgroundColor: "green"
};

const headerTextStyle: TextStyle = {
  color: "white",
  textAlign: "center",
  fontWeight: "bold"
};

export class Header extends React.Component {
  render() {
    return (
      <View style={headerStyle}>
        <Svg height={50} width={50} style={{ alignSelf: "center" }}>
          <Svg.Circle
            cx={25}
            cy={25}
            r={25}
            strokeWidth={1}
            stroke="#e74c3c"
            fill="#f1c40f"
          />
        </Svg>
        <Text style={headerTextStyle}>Header</Text>
      </View>
    );
  }
}
