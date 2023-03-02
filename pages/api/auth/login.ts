import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import "../../../utils/passport";
import dbconnect from "../../../utils/dbconnect";
import passport from "passport";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbconnect();
  passport.authenticate("local", {}, function (err, user) {
    if (err) {
      return res.status(400).send({ error: err });
    }
    if (!user) {
      return res.status(400).send({ error: "Invalid Login Details" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    setCookie("auth-token", token);
    return res.status(200).json(token);
  })(req, res);
}
