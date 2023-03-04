import axios, { AxiosRequestConfig } from "axios";
import { IEmptyResponse } from "../utils/resposneFx";

const baseURL = "http://localhost:3000";

const appAxios = axios.create({
  baseURL,
});
appAxios.defaults.headers.accept = "*/*";
appAxios.defaults.headers["Content-Type"] = "application/json";

export interface AppAxiosResponse<T = any> {
  data: IEmptyResponse<T>;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export default appAxios;
