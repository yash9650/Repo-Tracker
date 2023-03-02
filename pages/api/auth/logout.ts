import { removeCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  removeCookies("auth-token");
  return res.redirect("/login");
}
