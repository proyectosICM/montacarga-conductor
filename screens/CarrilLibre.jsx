import React, { useState } from "react";
import { View } from "react-native";
import globalStyles from "../Styles/general";
import { Text } from "react-native";
import { useRedirectEffect } from "../Hooks/useRedirectEffect";
import { useRoute } from "@react-navigation/native";
import { useListarElementos } from "../Hooks/CRUDHooks";
import { carrilesURL } from "../API/urlsApi";

export function CarrilLibre() {
  const route = useRoute();
  const { carrilId } = route.params;
  const [carril, setCarril] = useState();
  useListarElementos(`${carrilesURL}/${carrilId}`, carril, setCarril);
  useRedirectEffect(carril, 1);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Este carril se encuentra libre</Text>
    </View>
  ); 
}
