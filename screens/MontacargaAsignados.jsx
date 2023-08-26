import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export function MontacargaAsignados() {
  const [cargaRealizadaMontacarga1, setCargaRealizadaMontacarga1] =
    useState(false);
  const [cargaRealizadaMontacarga2, setCargaRealizadaMontacarga2] =
    useState(false);
  const [salidaConfirmada, setSalidaConfirmada] = useState(false); // Estado para la salida confirmada

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Montacargas asignados: 2</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={
            cargaRealizadaMontacarga1
              ? "Montacarga 1: Carga realizada"
              : "Montacarga 1: Realizando carga"
          }
          buttonStyle={[
            styles.button,
            cargaRealizadaMontacarga1 ? styles.cargaRealizadaButton : null,
          ]}
          onPress={() => setCargaRealizadaMontacarga1(true)}
        />
        <Button
          title={
            cargaRealizadaMontacarga2
              ? "Montacarga 2: Carga realizada"
              : "Montacarga 2: Realizando carga"
          }
          buttonStyle={[
            styles.button,
            cargaRealizadaMontacarga2 ? styles.cargaRealizadaButton : null,
          ]}
          onPress={() => setCargaRealizadaMontacarga2(true)}
        />
      </View>
      <Text style={styles.instructions}>
        Por favor espere a que se termine de realizar la carga
      </Text>

      <Text style={styles.securityText}>
        El auxiliar de seguridad debe confirmar el término de la carga y retiro de trabaruedas
      </Text>
      <Text style={styles.finDeCarga}>
        {cargaRealizadaMontacarga1 && cargaRealizadaMontacarga2
          ? "Fin de carga: Confirmado"
          : "Fin de carga: No confirmado"}
      </Text>
      <Button
        title={
          cargaRealizadaMontacarga1 && cargaRealizadaMontacarga2
            ? "Confirmar salida"
            : "Espere a que se confirme fin de carga"
        }
        buttonStyle={[
          styles.salidaButton,
          cargaRealizadaMontacarga1 && cargaRealizadaMontacarga2 ? styles.salidaConfirmadaButton : null, // Estilo condicional
        ]}
        onPress={() => setSalidaConfirmada(true)} // Simular la confirmación de salida
      />
      {cargaRealizadaMontacarga1 && cargaRealizadaMontacarga2 ? (
        <Text style={styles.precaucionText}>
          Recuerde por precaución mire sus espejos antes de salir
        </Text>
      ) : null}
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
  cargaRealizadaButton: {
    backgroundColor: "#28A745", // Cambiar a verde cuando la carga está realizada
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
  finDeCarga: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  salidaButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: 200,
  },
  salidaConfirmadaButton: {
    backgroundColor: "#28A745", // Cambiar a verde cuando la salida esté confirmada
  },
  precaucionText: {
    fontSize: 16,
    color: "red", // Cambiar el color del texto de precaución
    fontStyle: "italic",
    marginTop: 20,
  },
});

export default MontacargaAsignados;
