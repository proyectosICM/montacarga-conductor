export function getFormattedStartTime() {
    const horaDeInicio = new Date();
    const hora = horaDeInicio.getHours();
    const minutos = horaDeInicio.getMinutes().toString().padStart(2, "0");
    const segundos = horaDeInicio.getSeconds().toString().padStart(2, "0");
  
    return `${hora}:${minutos}:${segundos}`;
  }
  
  export function formateoTiempo(timeArray) {
      const horaDeInicio = new Date(
        0,
        0,
        0,
        timeArray[0],
        timeArray[1],
        timeArray[2]
      );
      
      const formattedHora = horaDeInicio.getHours();
      const formattedMinutos = horaDeInicio.getMinutes().toString().padStart(2, '0');
      const formattedSegundos = horaDeInicio.getSeconds().toString().padStart(2, '0');
    
      return `${formattedHora}:${formattedMinutos}:${formattedSegundos}`;
    }
    