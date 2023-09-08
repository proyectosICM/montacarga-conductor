import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { View } from "react-native";
import globalStyles from "../Styles/general";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useListarElementos } from "../Hooks/CRUDHooks";
import { carrilesURL } from "../API/urlsApi";
import { useRedirectEffect } from "../Hooks/useRedirectEffect";

export function CarrilPendiente() {
  const route = useRoute();
  const navigation = useNavigation();
  const { carrilId } = route.params;
  const [carril, setCarril] = useState();
  useListarElementos(`${carrilesURL}/${carrilId}`, carril, setCarril);

  useRedirectEffect(carril, 2);

  const [cantidadM, setCantidadM] = useState();

  useEffect(() => {
    if(carril){
      if(carril.placa1 && !carril.placa2 || !carril.placa1 && carril.placa2){
        setCantidadM(1);
      } else if(carril.placa1 && carril.placa2){
        setCantidadM(2)
      } else {
        setCantidadM(0)
      }
    }
  })
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Carril {carril && carril.nombre}</Text>
      <Text style={globalStyles.title}>
        Por favor espere a que los montacargas acepten realizar la carga
      </Text>
      <Text style={globalStyles.title}>
        Montacargas que han aceptado: {cantidadM}
      </Text>
      <Text style={globalStyles.title}>
        Trabaruedas colocado: {carril && carril.trabaruedas ? "Si":"No"}
      </Text>
      <ActivityIndicator size={200} color="black" />
    </View>
  );
}
