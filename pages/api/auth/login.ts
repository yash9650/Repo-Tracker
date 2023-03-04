import type { NextApiRequest, NextApiResponse } from "next";
import "../../../utils/passport";
import dbconnect from "../../../utils/dbconnect";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  emptyResponse,
  errorResponse,
  successResponse,
} from "../../../utils/resposneFx";
import { setCookie } from "cookies-next";
import { IUser } from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbconnect();
  const jsonResponse = { ...emptyResponse };

  try {
    passport.authenticate("local", {}, function (err, user: IUser) {
      if (err || !user) {
        jsonResponse.error = err;
        jsonResponse.errorMessage = "Invalid Login Details";
        return errorResponse(res, emptyResponse, 400);
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      // const bearerToken = "bearer " + token;
      // setCookie("auth-token", bearerToken, {
      //   res: res,
      //   req: req,
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV !== "development",
      //   sameSite: "strict",
      //   path: "/",
      //   maxAge: 3600,
      // });
      jsonResponse.success = true;
      jsonResponse.data = {
        token,
        user: {
          username: user.username,
          _id: user._id,
        },
      };
      jsonResponse.successMessage = "Logged In Successfully";
      return successResponse(res, jsonResponse);
    })(req, res);
  } catch (error) {
    jsonResponse.error = error;
    jsonResponse.errorMessage =
      error.errorMessage || error.name || "Something went wrong!!";
    return errorResponse(res, jsonResponse, 400);
  }
}
