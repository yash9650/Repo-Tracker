import mongoose from "mongoose";
import { IBranch } from "./Branch";
import { IIssue } from "./Issue";
import { IRepo } from "./Repository";
import passportLocalMongoose from "passport-local-mongoose";

export enum Role {
  ADMIN = "admin",
  DEVELOPER = "developer",
  TESTER = "tester",
}

export interface IUser {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: any;
  role: string;
  issues: IIssue[];
  repositories: IRepo[];
  branches: IBranch[];
}

const userSchema = new mongoose.Schema<IUser>({
  role: {
    type: String,
    enum: ["admin", "developer", "tester"],
  },
  issues: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
  branches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
  ],
  repositories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Repository",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

const User =
  (mongoose.models?.User as mongoose.Model<IUser>) ||
  mongoose.model("User", userSchema);

export default User;

// or (Not Sure watched in a video on youtube by Atharva)------>
// let User;

// try {
//   User = mongoose.model("User");
// } catch (error) {
//   User = mongoose.model("User",userSchema);
// }
