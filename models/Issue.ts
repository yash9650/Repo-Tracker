import mongoose from "mongoose";

export enum Status {
  INPROCESS = "inProcess",
  PENDING = "pending",
  RESOLVED = "resolved",
}

export interface IIssue {
  issueName: string;
  description: string;
  createdBy: string;
  status: Status;
}

const issueSchema = new mongoose.Schema<IIssue>({
  issueName: String,
  description: String,
  createdBy: String,
  status: {
    type: String,
    enum: ["inProcess", "pending", "resolved"],
  },
});

const Issue =
  (mongoose.models.Issue as mongoose.Model<IIssue>) ||
  mongoose.model("Issue", issueSchema);
