import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const DataDetailScreen = (props) => {
  const initialState = {
    id: "",
    apto: "",
    activity: "",
    progress: "",
  };

  const [word, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setData({ ...word, [prop]: value });
  };

  const getDataById = async (id) => {
    const dbRef = firebase.db.collection("data").doc(id);
    const doc = await dbRef.get();
    const word = doc.data();
    setData({ ...word, id: doc.id });
    setLoading(false);
  };

  const deleteData = async () => {
    setLoading(true);
    const dbRef = firebase.db.collection("data").doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false);
    props.navigation.navigate("DataList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Eliminar datos",
      "¿Estas seguro?",
      [
        { text: "Si", onPress: () => deleteData() },
        { text: "No", onPress: () => console.log("Elimination canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateData = async () => {
    const userRef = firebase.db.collection("data").doc(word.id);
    await userRef.set({
      apto: word.apto,
      activity: word.activity,
      progress: word.progress / 100,
    });
    setData(initialState);
    props.navigation.navigate("DataList");
  };

  useEffect(() => {
    getDataById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Apartamento"
          autoCompleteType="name"
          style={styles.inputGroup}
          value={word.apto}
          onChangeText={(value) => handleTextChange(value, "apto")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="off"
          placeholder="Actividad"
          style={styles.inputGroup}
          value={word.activity}
          onChangeText={(value) => handleTextChange(value, "activity")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Avance"
          autoCompleteType="off"
          style={styles.inputGroup}
          value={word.progress}
          onChangeText={(value) => handleTextChange(value, "progress")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Borrar"
          onPress={() => openConfirmationAlert()}
          color="#C20035"
        />
      </View>
      <View>
        <Button title="Editar" onPress={() => updateData()} color="#0A7414" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default DataDetailScreen;
