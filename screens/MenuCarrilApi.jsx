import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import { carrilesURL } from "../API/urlsApi.jsx";
import { useListarElementos } from "../Hooks/CRUDHooks";

export function MenuCarrilApi() {
  const navigation = useNavigation();

  const Detalles = (estado, dato) => {
    switch (estado) {
      case 1:
        navigation.navigate("Libre", { carrilId: dato });
        break;

      case 2:
        navigation.navigate("Pendiente", { carrilId: dato });
        break;

      case 3:
        navigation.navigate("Montacargas Asignados", { carrilId: dato });
        break;
    }
  };

  const [carriles, setCarriles] = useState();

  useListarElementos(carrilesURL, carriles, setCarriles);

  const getButtonStyle = (estadoId) => {
    if (estadoId === 1) {
      return styles.libreButton;
    } else if (estadoId === 2) {
      return styles.pendienteButton;
    } else if (estadoId === 3) {
      return styles.ocupadoButton;
    }
    return styles.libreButton; 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Por favor seleccione el carril en el que se encuentra
      </Text>
      <FlatList
        data={carriles}
        //keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        renderItem={({ item }) => (
          <View style={styles.column}>
            {item && (
              <Button
                title={`${item.id} - ${item.estadosModel.nombre} ${
                  item.cantidadMontacargas
                    ? ` - ${item.cantidadMontacargas} Montacargas `
                    : ""
                } `}
                buttonStyle={getButtonStyle(item.estadosModel.id)}
                onPress={() => Detalles(item.estadosModel.id, item.id)}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    padding: 15,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  libreButton: {
    backgroundColor: "#28A745", // Verde para botones libres
    marginBottom: 5,
    width: 120,
  },
  ocupadoButton: {
    backgroundColor: "#DC3545", // Rojo para botones ocupados
    marginBottom: 5,
    width: 120,
  },
  pendienteButton: {
    backgroundColor: "#FFC107", // Amarillo para botones pendientes
    marginBottom: 5,
    width: 120,
  },
  scanButton: {
    backgroundColor: "#007BFF", // Azul para botón de escanear QR
    marginTop: 20,
    width: 200,
  },
});

export default MenuCarrilApi;
