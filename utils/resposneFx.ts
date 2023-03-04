import { NextApiResponse } from "next";

export interface IEmptyResponse<T = any> {
  success: boolean;
  data: T;
  error: any;
  errorMessage: string;
  successMessage: string;
}

export const emptyResponse: IEmptyResponse = {
  success: false,
  data: [],
  error: {},
  errorMessage: "",
  successMessage: "",
};

export const successResponse = (res: NextApiResponse, data: IEmptyResponse) => {
  return res.status(200).json({ ...data });
};

export const errorResponse = (
  res: NextApiResponse,
  data: IEmptyResponse,
  status: number = 500
) => {
  return res.status(status).json({ ...data });
};
