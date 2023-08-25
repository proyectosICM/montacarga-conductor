import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export function Carga() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ActivityIndicator size={200} color="black" />
      <Button title={"Carga"} onPress={() => navigation.navigate("Solicitar Carga")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
