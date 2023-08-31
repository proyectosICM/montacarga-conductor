import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useListarElementos } from "../Hooks/CRUDHooks";
import { carrilesURL, salidaConductorURL } from "../API/urlsApi";
import globalStyles from "../Styles/general";
import axios from "axios";
import { useRedirectEffect } from "../Hooks/useRedirectEffect";
import { calcularTiempoTotal, formateoTiempo } from "../Hooks/timeUtils";

export function MontacargaAsignados() {
  const [cargaRealizadaMontacarga1, setCargaRealizadaMontacarga1] =
    useState(false);
  const [cargaRealizadaMontacarga2, setCargaRealizadaMontacarga2] =
    useState(false);
  const [salidaConfirmada, setSalidaConfirmada] = useState(false);

  const route = useRoute();
  const { carrilId } = route.params;

  const [carril, setCarril] = useState();
  useListarElementos(`${carrilesURL}/${carrilId}`, carril, setCarril);

  useRedirectEffect(carril, 3);

  const ConfirmarSalida = async () => {
    if (carril.finAuxiliar) {
      const requestData = {
        salida: 1,
      };
      console.log(`${salidaConductorURL}${carrilId}`);
      console.log(requestData);
      await axios.put(`${salidaConductorURL}${carrilId}`, requestData);
    }
  };

  return (
    <View style={styles.container}>
      {carril && (
        <>
          <Text style={globalStyles.title}>Carril {carril.nombre}</Text>
          <Text style={globalStyles.title}>
            Montacargas asignados: {carril.cantidadMontacargas}
          </Text>

          <Text style={styles.securityText}>
            Estado: {carril.estadosModel.nombre}{" "}
          </Text>
          <Text style={styles.securityText}>
            Hora Inicio:{" "}
            {carril.horaInicio ? formateoTiempo(carril.horaInicio) : "--"}
          </Text>
          {carril.horaFin && (
            <Text style={styles.securityText}>
              Hora Fin: {carril.horaFin ? formateoTiempo(carril.horaFin) : "--"}{" "}
            </Text>
          )}

          <Text style={styles.securityText}>
            TIempo total:{" "}
            {carril.horaInicio && carril.horaFin && (
              <Text>
                {calcularTiempoTotal(carril.horaInicio, carril.horaFin).minutos}
                :
                {
                  calcularTiempoTotal(carril.horaInicio, carril.horaFin)
                    .segundos
                }{" "}
                minutos
              </Text>
            )}
          </Text>

          <View style={styles.buttonContainer}>
            {carril.cantidadMontacargas === 1 && (
              <Button
                title={
                  carril.finMontacarga1
                    ? "Montacarga 1: Carga realizada"
                    : "Montacarga 1: Realizando carga"
                }
                buttonStyle={[
                  styles.button,
                  carril.finMontacarga1 ? styles.cargaRealizadaButton : null,
                ]}
                onPress={() => setCargaRealizadaMontacarga1(true)}
              />
            )}

            {carril.cantidadMontacargas === 2 && (
              <>
                <Button
                  title={
                    carril.finMontacarga1
                      ? "Montacarga 1: Carga realizada"
                      : "Montacarga 1: Realizando carga"
                  }
                  buttonStyle={[
                    styles.button,
                    carril.finMontacarga1 ? styles.cargaRealizadaButton : null,
                  ]}
                  onPress={() => setCargaRealizadaMontacarga1(true)}
                />

                <Button
                  title={
                    carril.finMontacarga2
                      ? "Montacarga 2: Carga realizada"
                      : "Montacarga 2: Realizando carga"
                  }
                  buttonStyle={[
                    styles.button,
                    carril.finMontacarga2 ? styles.cargaRealizadaButton : null,
                  ]}
                  onPress={() => setCargaRealizadaMontacarga2(true)}
                />
              </>
            )}
          </View>

          <Text style={styles.instructions}>
            Por favor espere a que se termine de realizar la carga
          </Text>

          <Text style={styles.securityText}>
            El auxiliar de seguridad debe confirmar el término de la carga y
            retiro de trabaruedas
          </Text>
          <Text style={styles.finDeCarga}>
            {carril.finAuxiliar
              ? "Fin de carga: Confirmado"
              : "Fin de carga: No confirmado"}
          </Text>
          <Text style={styles.finDeCarga}>
            {carril.salida
              ? "Salida del conductor: Confirmado"
              : "Salida del conductor: No confirmado"}
          </Text>
          {carril.salida === 0 ||
            (!carril.salida && (
              <Button
                title={
                  carril.finAuxiliar
                    ? "Confirmar salida"
                    : "Espere a que se confirme fin de carga"
                }
                buttonStyle={[
                  styles.salidaButton,
                  carril.finAuxiliar ? styles.salidaConfirmadaButton : null, // Estilo condicional
                ]}
                onPress={() => ConfirmarSalida()} // Simular la confirmación de salida
              />
            ))}

          {carril.salida ? (
            <Text style={styles.precaucionText}>
              Recuerde por precaución mire sus espejos antes de salir
            </Text>
          ) : null}
        </>
      )}
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