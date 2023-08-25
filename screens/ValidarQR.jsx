import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

export function ValidarQR() {
  const navigation = useNavigation(); // Corrección aquí
  // Generar un ID aleatorio (puedes usar una lógica diferente si es necesario)
  const randomId = Math.floor(Math.random() * 1000000).toString();
  
  const goToCargaScreen = () => {
    navigation.navigate('Cargando'); // Usar navigation.navigate directamente
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escanear QR</Text>
      {/* Generar y mostrar el código QR con el ID aleatorio */}
      <View style={styles.qrContainer}>
        <QRCode value={randomId} size={200} />
      </View>
      <Button title={'Carga'} onPress={goToCargaScreen} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  qrContainer: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
});
