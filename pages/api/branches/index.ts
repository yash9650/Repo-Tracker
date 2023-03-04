import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import Branch, { IBranch } from "../../../models/Branch";
import Repository from "../../../models/Repository";
import dbConnect from "../../../utils/dbconnect";
import {
  emptyResponse,
  errorResponse,
  successResponse,
} from "../../../utils/resposneFx";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const jsonResponse = { ...emptyResponse };

  try {
    if (req.method === "GET") {
      jsonResponse.data = await Branch.find();
    }
    if (req.method === "POST") {
      jsonResponse.data = await createBranch(req.body.branchData);
    }
    if (req.method === "PATCH") {
      jsonResponse.data = await updateBranch(
        req.body.branchId,
        req.body.branchData
      );
    }
    if (req.method === "DELETE") {
      jsonResponse.data = await deleteBranch(req.body.branchId);
    }
    jsonResponse.success = true;
    return successResponse(res, jsonResponse);
  } catch (error) {
    jsonResponse.error = error;
    jsonResponse.errorMessage =
      error.errorMessage || error.name || "Something went wrong!!";
    return errorResponse(res, jsonResponse);
  }
}

const createBranch = async (branchData: IBranch) => {
  const newBranch = await Branch.create(branchData);
  const repo = await Repository.findById({ _id: branchData.repository });
  repo.branches.push(newBranch);
  await repo.save();
  return newBranch;
};

const updateBranch = async (
  branchId: mongoose.Schema.Types.ObjectId,
  branchData: IBranch
) => {
  const updatedBranch = await Branch.findByIdAndUpdate(
    { _id: branchId },
    { ...branchData },
    { new: true }
  );
  return updatedBranch;
};

const deleteBranch = async (branchId: mongoose.Schema.Types.ObjectId) => {
  const deletedBranch = await Branch.findByIdAndDelete(branchId);
  return deleteBranch;
};
