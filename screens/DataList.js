import React, { useState, useEffect } from "react";
import { Button, Text, StyleSheet, Alert } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";
import XLSX from "xlsx";

const DataScreen = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase.db.collection("data").onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.docs.forEach((doc) => {
        const { apto, activity, progress } = doc.data();
        data.push({
          id: doc.id,
          apto,
          activity,
          progress,
        });
      });
      setData(data);
    });
  });

  // Export function
  const exportData = () => {
    var workSheet = XLSX.utils.json_to_sheet(data); //create a work sheet
    var workBook = XLSX.utils.book_new(); //create a new book
    XLSX.utils.book_append_sheet(workBook, workSheet, "AcabApp DataBase"); //append sheet into the book
    XLSX.writeFile(workBook, "AcabApp.xlsx"); //write new file
  };

  const alertExportData = () => {
    Alert.alert(
      "Crear archivo Excel",
      "¿Estás seguro?",
      [
        { text: "Si", onPress: () => exportData },
        { text: "No", onPress: () => console.log("Exportation canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };
  return (
    <ScrollView>
      {/* BUTTOMS       */}
      <Button
        onPress={() => props.navigation.navigate("CreateDataScreen")}
        title="Registrar datos"
        color="#7890D1"
      />
      <Button
        onPress={() => exportData()}
        title="Exportar datos"
        color="#0507B2"
      />
      {/* Show date into data base */}
      {data.map((word) => {
        return (
          <ListItem
            key={word.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("DataDetailScreen", {
                userId: word.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://cdn.discordapp.com/attachments/579772202744807435/788566601133850624/pexels-photo-439391.jpeg",
              }}
              rounded
            />
            <ListItem.Content>
              {/* Generate unorden data */}
              <ListItem.Title>
                <Text style={styles.negrita}>Apto: </Text>
                {word.apto}
              </ListItem.Title>
              <ListItem.Subtitle>
                <Text style={styles.negrita}>Actividad: </Text>
                {word.activity}{" "}
                <Text style={styles.negrita}>{"\n"}Avance: </Text>
                {word.progress * 100}%
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  negrita: { fontWeight: "bold" },
  cursiva: { fontStyle: "italic" },
  subrayado: { textDecorationLine: "underline" },
});

//export

export default DataScreen;
