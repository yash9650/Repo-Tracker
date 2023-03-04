import type { NextApiRequest, NextApiResponse } from "next";
import dbconnect from "../../../utils/dbconnect";
import Branch, { IBranch } from "../../../models/Branch";
import {
  emptyResponse,
  errorResponse,
  successResponse,
} from "../../../utils/resposneFx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbconnect();
  const jsonResponse = { ...emptyResponse };
  try {
    if (req.method === "GET") {
      jsonResponse.data = await Branch.findById({ _id: req.query._id });
    }
    jsonResponse.success = true;
    return successResponse(res, jsonResponse);
  } catch (error) {
    jsonResponse.error = error;
    jsonResponse.errorMessage =
      error.errorMessage || error.name || "Something went wrong!!";
    return errorResponse(res, jsonResponse);
  }
}
