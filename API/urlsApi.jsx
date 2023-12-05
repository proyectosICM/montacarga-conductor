//export const base = 'http://161.132.180.242:65006/api';
//export const base = 'http://192.168.1.202:65006/api';
// export const base = '161.132.180.242:65006/api/api';

// export const base = 'https://samloto.com:65006/api';

export const base = 'https://montacargas-api-production.up.railway.app/api';

export const carrilesURL = `${base}/carriles`;
//export const carrilesURL = `https://api-montacargas-production.up.railway.app/api/carriles`;
export const asignarMont = `${carrilesURL}/asignarMontacargas/`

export const salidaConductorURL = `${carrilesURL}/salidaConductor/`
export const finAuxiliarURL = `${carrilesURL}/finAuxiliar/`
export const cambiarEstadoURL = `${carrilesURL}/cambiarEstado/`