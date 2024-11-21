import axios from 'axios';

// Configuración de Axios
const Api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/especies',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;
