import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

export function SolicitarCarga() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false); // Estado para habilitar/deshabilitar el botón
  const [secondsRemaining, setSecondsRemaining] = useState(5); // Estado para el temporizador

  useEffect(() => {
    // Iniciar el temporizador cuando el componente se monta
    const interval = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        clearInterval(interval); // Detener el temporizador cuando llegue a cero
        setIsEnabled(true); // Habilitar el botón
      }
    }, 1000); // Actualizar cada 1 segundo

    // Limpieza cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usted ha sido asignado al carril 4</Text>
      <Text style={styles.subtitle}>
        Colóquese en el carril y una vez allí solicite su carga
      </Text>
      <Text style={styles.timerText}>
        {isEnabled
          ? "Puede solicitar carga ahora."
          : `Espere ${secondsRemaining} segundos antes de solicitar carga.`}
      </Text>
      <Button
        title={"Solicitar Carga"}
        buttonStyle={[styles.button, isEnabled && styles.enabledButton]}
        onPress={() => {
          if (isEnabled) {
            navigation.navigate("Montacargas Asignados");
          }
        }}
        disabled={!isEnabled}
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
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },
  timerText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  enabledButton: {
    backgroundColor: "green", // Cambiar el color cuando esté habilitado
  },
});
