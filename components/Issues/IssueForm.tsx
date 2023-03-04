import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { IIssue } from "../../models/Issue";
import Select from "react-select";
import mongoose from "mongoose";
import { getRepo, saveOrEditBranch } from "../common/CommonFx";

enum Status {
  INPROCESS = "inProcess",
  PENDING = "pending",
  RESOLVED = "resolved",
}

export const branchFormDefaultValues = {
  issueName: "",
  description: "",
  createdBy: "",
  status: Status.PENDING,
};

const IssueForm: React.FC<{
  issueId?: string | any;
  issueData?: IIssue;
  onSave: (success: boolean) => void;
  submitModal?: boolean;
}> = (props) => {
  const [repositoriesOptArr, setRepositoriesOptArr] = useState<
    {
      label: string;
      value: mongoose.Schema.Types.ObjectId;
    }[]
  >();
  const { register, handleSubmit, getValues, setValue, reset, watch } =
    useForm<{
      issueName: string;
      description: string;
      createdBy: string;
      status: Status;
    }>({
      defaultValues: branchFormDefaultValues,
    });

  // saving new branch or editing branch to Db
  const submitHandler = async (formData) => {
    console.log(formData);

    const reqOpt: any = {
      method: "POST",
      url: "/api/issue",
      data: {
        issueData: formData,
      },
    };

    if (props.issueData) {
      reqOpt.method = "PATCH";
      reqOpt.data = {
        branchId: props.issueId,
        issueData: formData,
      };
    }

    // try {
    //   const res = await saveOrEditBranch(formData, reqOpt);
    //   reset(branchFormDefaultValues);
    //   props.onSave(res.data.success);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // setting issueData if branch is to be updated and opening model
  useEffect(() => {
    if (props.issueData) {
      reset({
        issueName: props.issueData.issueName,
        createdBy: props.issueData.createdBy?.toString(),
        description: props.issueData.description,
        status: props.issueData.status,
      });
    }
  }, [props.issueData]);

  useEffect(() => {
    (async () => {
      const optArr = await getRepo();
      optArr && setRepositoriesOptArr(optArr);
    })();
  }, []);

  useEffect(() => {
    if (props.submitModal) {
      handleSubmit(submitHandler)();
    }
  }, [props.submitModal]);

  const watchForm = watch();

  return (
    <div className="container branch-form">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Branch name</Form.Label>
          <Form.Control
            {...register("issueName")}
            type="text"
            placeholder="Enter branch name..."
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Created by</Form.Label>
          <Form.Control
            {...register("createdBy")}
            type="text"
            placeholder="Enter name..."
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Created by</Form.Label>
          <Form.Control
            {...register("description")}
            type="textarea"
            placeholder="Enter name..."
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select Repository:</Form.Label>
          <Form.Select {...register("status")}>
            <option>Open this select menu</option>
            <option value={Status.PENDING}>Pending</option>
            <option value={Status.INPROCESS}>In Process</option>
            <option value={Status.RESOLVED}>Resolved</option>
          </Form.Select>
        </Form.Group>
        {props.issueData && (
          <Form.Group className="mb-3">
            <Form.Control type="submit" placeholder="Submit" />
          </Form.Group>
        )}
      </Form>
    </div>
  );
};

export default IssueForm;
