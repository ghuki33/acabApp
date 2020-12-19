import React from "react";
import { StyleSheet } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native-elements";

// Components
import CreateDataScreen from "./screens/CreateDataScreen";
import DataDetailScreen from "./screens/DataDetailScreen";
import DataList from "./screens/DataList";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#91488F",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="DataList"
        component={DataList}
        options={{ title: "ACABAPP | Lista de datos" }}
      />
      <Stack.Screen
        name="CreateDataScreen"
        component={CreateDataScreen}
        options={{ title: "ACABAPP | Registro" }}
      />
      <Stack.Screen
        name="DataDetailScreen"
        component={DataDetailScreen}
        options={{ title: "ACABAPP | Detalles" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack style={styles.container} />
      <Text style={styles.copyright}>
        &copy; Zanetti Apartamentos | 2020 - 2021
      </Text>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  copyright: {
    textAlign: "center",
  },
});
