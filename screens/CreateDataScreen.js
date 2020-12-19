import React, { useState } from "react";
import { Button, View, StyleSheet, TextInput, ScrollView } from "react-native";

import firebase from "../database/firebase";

const AddDataScreen = (props) => {
  const initalState = {
    apto: "",
    activity: "",
    progress: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewData = async () => {
    if (state.apto === "") {
      alert("El campo apartamento está vacio.");
    } else if (state.activity === "") {
      alert("El campo actividad está vacio.");
    } else if (state.progress === "") {
      alert("El campo avance está vacio.");
    } else if (state.progress > 100) {
      alert("El avance no puede ser mayor a 100%.");
    } else {
      try {
        await firebase.db.collection("data").add({
          apto: state.apto,
          activity: state.activity,
          progress: state.progress / 100,
        });
        alert("Datos guardados correctamente");
        props.navigation.navigate("DataList");
      } catch (error) {
        console.log(error);
        alert(
          "Se ha producido un error al guardar los datos, por favor intentelo más tarde."
        );
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Apto Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Apartamento"
          onChangeText={(value) => handleChangeText(value, "apto")}
          value={state.apto}
        />
      </View>

      {/* Activity Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Actividad"
          multiline={true}
          onChangeText={(value) => handleChangeText(value, "activity")}
          value={state.activity}
        />
      </View>

      {/* Progress Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Avance"
          keyboardType="numeric"
          onChangeText={(value) => handleChangeText(value, "progress")}
          value={state.progress}
        />
      </View>

      <View style={styles.button}>
        <Button title="Enviar datos" onPress={() => saveNewData()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddDataScreen;
