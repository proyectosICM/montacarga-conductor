import { StyleSheet } from "react-native";


export const LogoAb = require('../Styles/logoab.png');


const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#63777D",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    padding: 10,
  },
  imagenLogo: {
    width: 350,  
    height: 150, 
    margin: 15
  },
  subLogo: {
    width: 250,  
    height: 100, 
    margin: 15
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default globalStyles;
