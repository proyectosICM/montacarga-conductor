import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import { useListarElementos } from "../Hooks/CRUDHooks";
import { cambiarEstadoURL, carrilesURL, finAuxiliarURL, salidaConductorURL } from "../API/urlsApi";
import globalStyles, { LogoAb } from "../Styles/general";
import axios from "axios";
import { useRedirectEffect } from "../Hooks/useRedirectEffect";
import { calcularTiempoTotal, formateoTiempo, getFormattedStartTime } from "../Hooks/timeUtils";

export function MontacargaAsignados() {
  const route = useRoute();
  const { carrilId } = route.params;
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [carril, setCarril] = useState();
  useListarElementos(`${carrilesURL}/${carrilId}`, carril, setCarril);

  useRedirectEffect(carril, 3);

  const ConfirmarFin = async () => {
    const horaDeFin = getFormattedStartTime();
    const requestData = {
      finAuxiliar: 1,
      //horaFin: horaDeFin,
    };
    await axios.put(`${finAuxiliarURL}${carrilId}`, requestData);
  };

  useEffect(() => {
    if (carril) {
      if (!carril.finAuxiliar) {
        if (carril.cantidadMontacargas == 1 && carril.finMontacarga1) {
          ConfirmarFin();
        } else if (
          carril.cantidadMontacargas == 2 &&
          carril.finMontacarga1 &&
          carril.finMontacarga2
        ) {
          ConfirmarFin();
        }
      }
    }
  }, [carril]);

  const ConfirmarSalida = async () => {
    if (carril.finAuxiliar) {
      const requestData = {
        salida: true,
      };
      await axios.put(`${salidaConductorURL}${carrilId}`, requestData);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);

        if (secondsRemaining == 1) {
          await axios.put(`${cambiarEstadoURL}${carrilId}/1`);
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining]);

  useEffect(() => {
    if (carril && carril.salida) {
      if (secondsRemaining == 0) {
        setSecondsRemaining(10);
      }
    }
  }, [carril]);

  return (
    <View style={globalStyles.container}>
      <View>
        <Image source={LogoAb} style={globalStyles.subLogo} resizeMode="contain" />
      </View>
      {carril && (
        <>
          <Text style={[globalStyles.title, { marginBottom: 0 }]}>Carril {carril.nombre}</Text>
          <Text style={globalStyles.title}>Montacargas asignados: {carril.cantidadMontacargas}</Text>

          <Text style={styles.securityText}>Estado: {carril.estadosModel.nombre} </Text>
          <Text style={styles.securityText}>Hora Inicio: {carril.horaInicio ? formateoTiempo(carril.horaInicio) : "--"}</Text>
          {carril.horaFin && (
            <>
              <Text style={styles.securityText}>Hora Fin: {carril.horaFin ? formateoTiempo(carril.horaFin) : "--"} </Text>
              <Text style={styles.securityText}>
                Tiempo total:{" "}
                {carril.horaInicio && carril.horaFin && (
                  <Text>
                    {calcularTiempoTotal(carril.horaInicio, carril.horaFin).minutos}:{calcularTiempoTotal(carril.horaInicio, carril.horaFin).segundos}{" "}
                    minutos
                  </Text>
                )}
              </Text>
            </>
          )}

          <View style={styles.buttonContainer}>
            {carril.cantidadMontacargas === 1 && (
              <Button
                title={carril.finMontacarga1 ? `Montacarga 1 Carga terminada ` : `Montacarga 1 Cargando mercaderia `}
                buttonStyle={[styles.button, carril.finMontacarga1 ? styles.cargaRealizadaButton : null]}
              />
            )}

            {carril.cantidadMontacargas === 2 && (
              <>
                <Button
                  title={carril.finMontacarga1 ? `Montacarga 1 Carga terminada ` : `Montacarga 1 Cargando mercaderia `}
                  buttonStyle={[styles.button, carril.finMontacarga1 ? styles.cargaRealizadaButton : null]}
                />

                <Button
                  title={carril.finMontacarga2 ? `Montacarga 2 Carga terminada ` : `Montacarga 2 Cargando mercaderia `}
                  buttonStyle={[styles.button, carril.finMontacarga2 ? styles.cargaRealizadaButton : null]}
                />
              </>
            )}
          </View>

          <Text style={styles.securityText}>Espere a que el sensor detecte que se a terminado de realizar la carga</Text>
          <Text style={styles.finDeCarga}>{carril.finAuxiliar ? "Fin de carga: Confirmado" : "Fin de carga: No confirmado"}</Text>
          <Text style={styles.finDeCarga}>{carril.salida ? "Salida del conductor: Confirmado" : "Salida del conductor: No confirmado"}</Text>
          {carril.salida === 0 ||
            (!carril.salida && (
              <Button
                title={carril.finAuxiliar ? "Confirmar salida" : "Espere a que se confirme fin de carga"}
                buttonStyle={[
                  styles.salidaButton,
                  carril.finAuxiliar ? styles.salidaConfirmadaButton : null, // Estilo condicional
                ]}
                onPress={() => ConfirmarSalida()} // Simular la confirmación de salida
              />
            ))}
          {carril.salida ? <Text style={styles.precaucionText}>Recuerde por precaución mire sus espejos antes de salir.</Text> : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row", 
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    marginRight: 10, 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: 160, 
  },
  cargaRealizadaButton: {
    backgroundColor: "#28A745", 
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
    backgroundColor: "#28A745", 
  },
  precaucionText: {
    fontSize: 16,
    color: "red", 
    fontStyle: "italic",
    marginTop: 20,
  },
});

export default MontacargaAsignados;
