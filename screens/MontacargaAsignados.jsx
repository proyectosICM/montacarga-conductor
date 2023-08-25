import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export function MontacargaAsignados() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Montacargas asignados: 2</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Montacarga 1: Realizando carga"
          buttonStyle={styles.button}
        />
        <Button
          title="Montacarga 2: Carga realizada"
          buttonStyle={styles.button}
        />
      </View>
      <Text style={styles.instructions}>
        Por favor espere a que se termine de realizar la carga
      </Text>

      <Text style={styles.securityText}>
        El auxiliar de seguridad debe autorizar su salida. Por favor espere.
      </Text>
      <Button
        title={'Salida no autorizada'}
        buttonStyle={styles.salidaButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row", // Para alinear los botones en fila
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    marginRight: 10, // Espacio entre los botones
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10, // Mayor valor para hacerlo más cuadrado
    width: 160, // Ancho de los botones
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  securityText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  salidaButton: {
    backgroundColor: "#DC3545", // Rojo para el botón de salida no autorizada
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: 200,
  },
});

export default MontacargaAsignados;
