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
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Carril {carril && carril.nombre}</Text>
      <Text style={globalStyles.title}>
        Por favor espere a que el auxiliar coloque el trabaruedas y le asigne
        montacargas
      </Text>
      <ActivityIndicator size={200} color="black" />
    </View>
  );
}
