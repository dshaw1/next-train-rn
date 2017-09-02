// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Platform,
//   StyleSheet
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";

// renderAddIcon = () => {
//   if (Platform.OS === "ios") {
//     return <Icon name="ios-add" size={18} color="#ffffff" />;
//   } else {
//     return <Icon name="md-add" size={18} color="#ffffff" />;
//   }
// };

// renderEditIcon = () => {
//   if (Platform.OS === "ios") {
//     return <Icon name="ios-arrow-down" size={18} color="#ffffff" />;
//   } else {
//     return <Icon name="md-arrow-dropdown" size={18} color="#ffffff" />;
//   }
// };

// export const AddButton = () => (
//   <TouchableOpacity onPress={() => console.log("pressed me!")}>
//     <View>
//       <Icon name="ios-add" size={18} color="#ffffff" />
//     </View>
//   </TouchableOpacity>
// );

// export const EditButton = ({ text }) => (
//   <TouchableOpacity
//     style={[styles.button, { backgroundColor: "tomato" }]}
//     onPress={() => console.log("pressed me!")}
//   >
//     <View>
//       <Text style={{ color: "white" }}>{text}</Text>
//     </View>
//   </TouchableOpacity>
// );

// export default AddButton;
