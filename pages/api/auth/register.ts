import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import "../../../utils/passport";
import dbconnect from "../../../utils/dbconnect";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import {
  emptyResponse,
  errorResponse,
  successResponse,
} from "../../../utils/resposneFx";
import { setCookie } from "../../../utils/cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbconnect();
  const jsonResponse = { ...emptyResponse };
  try {
    const { username, password, role } = req.body;
    const newUser = new User({ username, role });
    const registeredNewUser = await User.register(newUser, password);
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    const bearerToken = "bearer " + token;
    // setCookie(res, "auth-token", bearerToken);

    jsonResponse.success = true;
    jsonResponse.successMessage = "User Created Successfully";
    jsonResponse.data = bearerToken;
    return successResponse(res, jsonResponse);
  } catch (error) {
    jsonResponse.error = error;
    jsonResponse.errorMessage =
      error.errorMessage || error.name || "Something went wrong!!";
    return errorResponse(res, jsonResponse, 400);
  }
}
