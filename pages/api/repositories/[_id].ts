import type { NextApiRequest, NextApiResponse } from "next";
import dbconnect from "../../../utils/dbconnect";
import Repository, { IRepo } from "../../../models/Repository";
import Branch, { IBranch } from "../../../models/Branch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbconnect();
  try {
    let repo;
    if (req.method === "GET") {
      repo = await Repository.findById({ _id: req.query._id }).populate(
        "branches"
      );
    }
    return res.status(200).json(repo);
  } catch (error) {
    console.log(error);
  }
}
