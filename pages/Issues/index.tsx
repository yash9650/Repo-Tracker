import { NextPage } from "next";
import React from "react";
import AddIssueForm from "../../components/Issues/AddIssueForm";
const IssuePage: NextPage = () => {
  return (
    <div className="container">
      <div>
        <AddIssueForm refreshOnSave={() => {}} />
      </div>
    </div>
  );
};

export default IssuePage;
