import React from "react";
import {
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert
} from "react-native";
import { api, isOk } from "client/api";
import { Logo } from "client/logo";
import { colors } from "client/colors";
import { autobind } from "core-decorators";
import { observable } from "mobx";
import { observer } from "mobx-react";

const styles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    fontSize: 16,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
    borderRadius: 3
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
    backgroundColor: "#306AD7"
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

@observer
@autobind
export class App extends React.Component {
  @observable num1: number | undefined;
  @observable num2: number | undefined;
  @observable working = false;

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.PRIMARY_BACKGROUND,
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ paddingTop: 80, width: 300 }}>
          <StatusBar barStyle="light-content" />
          <Logo />
          <TextInput
            style={styles.textInput}
            placeholder="Integer"
            value={typeof this.num1 === "number" ? this.num1.toString() : ""}
            onChangeText={this.changeNum1}
            keyboardType="numeric"
            keyboardAppearance="dark"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Integer"
            value={typeof this.num2 === "number" ? this.num2.toString() : ""}
            onChangeText={this.changeNum2}
            keyboardType="numeric"
            keyboardAppearance="dark"
          />
          <TouchableOpacity style={styles.button} onPress={this.add}>
            <Text style={styles.buttonText}>
              {this.working ? "Calculating..." : "Add"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.openPreviousCalculations}
          >
            <Text style={styles.buttonText}>See Previous Calculations</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  changeNum1(value: string) {
    if (this.working) {
      return;
    }

    const num = parseInt(value, 10);
    this.num1 = isNaN(num) ? undefined : num;
  }

  changeNum2(value: string) {
    if (this.working) {
      return;
    }

    const num = parseInt(value, 10);
    this.num2 = isNaN(num) ? undefined : num;
  }

  async add() {
    Keyboard.dismiss();

    if (typeof this.num2 !== "number" || typeof this.num1 !== "number") {
      Alert.alert("Invalid", "Both numbers required");
      return;
    }

    this.working = true;

    const response = await api.add(this.num1, this.num2);

    if (isOk(response)) {
      Alert.alert("Answer", `${this.num1} + ${this.num2} = ${response.result}`);
    } else {
      Alert.alert("Error", response.error!.message);
    }

    this.working = false;
    this.num1 = undefined;
    this.num2 = undefined;
  }

  async openPreviousCalculations() {
    const response = await api.getCalculationList({ start: 0, count: 5 });

    if (isOk(response)) {
      Alert.alert(
        "Previous Calculations",
        response.result
          .map(calculation => {
            return `${calculation.num1} + ${calculation.num2} = ${
              calculation.result
            }`;
          })
          .join("\n")
      );
    }
  }
}
