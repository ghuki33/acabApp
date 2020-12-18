// const AddDataScreen = (props) => {
//   const initalState = {
//     apto: "",
//     activity: "",
//     progress: "",
//   };

//   const [state, setState] = useState(initalState);

//   const handleChangeText = (value, name) => {
//     setState({ ...state, [name]: value });
//   };



//   const saveNewData = async () => {
//     if (state.apto === "") {
//       alert("El campo apartamento está vacio.");
//     }else if (state.activity === ""){
//       alert("El campo actividad está vacio.");
//     }else if (state.progress === ""){
//       alert("El campo avance está vacio.");
//     } else {
//       try {
//         await firebase.db.collection("data").add({
//           apto: state.apto,
//           activity: state.activity,
//           progress: state.progress,
//         });
//         console.log("Datos agregados")
//         props.navigation.navigate("DataList");
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   };

// };