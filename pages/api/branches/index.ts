import type { NextApiRequest, NextApiResponse } from "next";
import Branch, { IBranch } from "../../../models/Branch";
import Repository from "../../../models/Repository";
import dbConnect from "../../../utils/dbconnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  let branch;
  if (req.method === "GET") {
    branch = await Branch.find();
  }
  if (req.method === "POST") {
    branch = await createBranch(req.body.branchData);
  }
  if (req.method === "PATCH") {
    // branch = await createBranch(req.body.branchData);
  }
  return res.status(200).json(branch);
}

const createBranch = async (branchData: IBranch) => {
  const branch = await Branch.create(branchData);
  const repo = await Repository.findById({ _id: branchData.repository });
  repo.branches.push(branch);
  await repo.save();
  return branch;
};
