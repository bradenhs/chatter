import React from "react";
import { View, TextInput, StatusBar } from "react-native";
import { Logo } from "client/logo";
import { colors } from "client/colors";

export class App extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.PRIMARY_BACKGROUND,
          paddingTop: 30,
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{}}>
          <StatusBar barStyle="light-content" />
          <Logo />
          <TextInput
            style={{ paddingHorizontal: 20, paddingVertical: 15 }}
            placeholder="Username"
            keyboardAppearance="dark"
          />
        </View>
      </View>
    );
  }
}
