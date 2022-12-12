const axios = require('axios').default;

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getTime() {
    return instance.get('/time');
  },
  getCPU(value) {
    return instance.get(`/cpu-${value}`);
  },
  getRAM() {
    return instance.get('/ram');
  },
  getHardwareInfo() {
    return instance.get('/hardware-info');
  },
  getInfos(info) {
    return instance.get(`/info-${info}`);
  },
};
