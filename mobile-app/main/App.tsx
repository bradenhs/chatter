import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import { reverse } from "common/reverse";

export class FacebookButton extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={{ padding: 15, alignItems: "center", borderRadius: 5 }}
        >
          <Text
            style={{
              backgroundColor: "transparent",
              fontSize: 15,
              color: "#fff"
            }}
          >
            {reverse("Hello")}
          </Text>
        </LinearGradient>
      </View>
    );
  }
}

export class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Person</Text>
        <FacebookButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
