import type { NextApiRequest, NextApiResponse } from "next";
import dbconnect from "../../../utils/dbconnect";
import Branch, { IBranch } from "../../../models/Branch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbconnect();
  try {
    let branch;
    if (req.method === "GET") {
      branch = await Branch.findById({ _id: req.query._id });
    }
    return res.status(200).json(branch);
  } catch (error) {
    console.log(error);
  }
}
