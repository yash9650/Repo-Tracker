import axios from "axios";

const baseURL = "http://localhost:3000";

const appAxios = axios.create({
  baseURL,
});
appAxios.defaults.headers.accept = "*/*";
appAxios.defaults.headers["Content-Type"] = "application/json";

export default appAxios;
