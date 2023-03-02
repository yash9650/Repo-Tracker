import mongoose from "mongoose";
import { IBranch } from "./Branch";

export interface IRepo {
  _id: mongoose.Schema.Types.ObjectId;
  repoName: string;
  branches: IBranch[];
  createdAt: Date;
  updatedAt: Date;
}

const repositorySchema = new mongoose.Schema<IRepo>(
  {
    repoName: String,
    branches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Repository =
  (mongoose.models.Repository as mongoose.Model<IRepo>) ||
  mongoose.model("Repository", repositorySchema);

export default Repository;
