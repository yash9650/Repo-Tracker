import mongoose from "mongoose";

export interface IBranch {
  _id: mongoose.Schema.Types.ObjectId;
  branchName: string;
  createdBy: string;
  isMerged: boolean;
  isPullRequestCreated: boolean;
  isDeleted: boolean;
  mergedAt: Date;
  pullRequestCreatedAt: Date;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  repository: mongoose.Schema.Types.ObjectId;
}

const branchSchema = new mongoose.Schema<IBranch>(
  {
    branchName: String,
    createdBy: String,
    isMerged: Boolean,
    isPullRequestCreated: Boolean,
    isDeleted: Boolean,
    mergedAt: Date,
    pullRequestCreatedAt: Date,
    deletedAt: Date,
    repository: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.Branch as mongoose.Model<IBranch>) ||
  mongoose.model("Branch", branchSchema);
