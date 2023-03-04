import mongoose from "mongoose";

export interface IBranch {
  _id: mongoose.Schema.Types.ObjectId;
  branchName: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  isMerged: boolean;
  isPullRequestCreated: boolean;
  isDeleted: boolean;
  mergedAt: Date;
  pullRequestCreatedAt: Date;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  issue: mongoose.Schema.Types.ObjectId;
  repository: mongoose.Schema.Types.ObjectId;
}

const branchSchema = new mongoose.Schema<IBranch>(
  {
    branchName: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.Branch as mongoose.Model<IBranch>) ||
  mongoose.model("Branch", branchSchema);
