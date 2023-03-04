import type { NextApiRequest, NextApiResponse } from "next";
import dbconnect from "../../../utils/dbconnect";
import Repository, { IRepo } from "../../../models/Repository";
import Branch, { IBranch } from "../../../models/Branch";
import {
  emptyResponse,
  errorResponse,
  successResponse,
} from "../../../utils/resposneFx";
import { verifyUser } from "../../../utils/authFx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbconnect();
  const jsonResponse = { ...emptyResponse };
  try {
    if (req.method === "GET") {
      jsonResponse.data = await Repository.find();
    }
    if (req.method === "POST") {
      jsonResponse.data = await createRepo(req.body);
    }
    if (req.method === "PATCH") {
      jsonResponse.data = await addBranchInRepo(
        req.body.repoId,
        req.body.branchData
      );
    }
    jsonResponse.success = true;
    jsonResponse.error = null;
    return successResponse(res, jsonResponse);
  } catch (error) {
    jsonResponse.error = error;
    jsonResponse.errorMessage =
      error.errorMessage || error.name || "Something went wrong!!";
    return errorResponse(res, jsonResponse);
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
