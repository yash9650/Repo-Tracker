import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import "../../../utils/passport";
import dbconnect from "../../../utils/dbconnect";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbconnect();
  try {
    const { username, password, role } = req.body;
    const newUser = new User({ username, role });
    const registeredNewUser = await User.register(newUser, password);
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    setCookie("auth-token", token);
    return res.status(200).send(token);
  } catch (error) {
    console.log(error);
  }
}
