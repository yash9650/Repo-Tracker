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
      repo = await Repository.find();
    }
    if (req.method === "POST") {
      repo = await createRepo(req.body);
    }
    if (req.method === "PATCH") {
      repo = await addBranchInRepo(req.body.repoId, req.body.branchData);
    }
    return res.status(200).json(repo);
  } catch (error) {
    console.log(error);
  }
}

// Create Repo----->
const createRepo = async (repoData: IRepo) => {
  const newRepo = await Repository.create(repoData);
  return newRepo;
};

// Add Branches in repo----->
export const addBranchInRepo = async (repoId: string, branchData: IBranch) => {
  const repo = await Repository.findById({ _id: repoId });
  const branch = await Branch.create(branchData);
  repo.branches.push(branch);
  await repo.save();
  return repo;
};
