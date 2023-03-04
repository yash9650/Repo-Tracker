import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { IBranch } from "../../models/Branch";
import Select from "react-select";
import mongoose from "mongoose";
import { getRepo, saveOrEditBranch } from "../common/CommonFx";

export const branchFormDefaultValues = {
  branchName: "",
  createdBy: "",
  isMerged: false,
  isPullRequestCreated: false,
  isDeleted: false,
  mergedAt: null,
  pullRequestCreatedAt: null,
  deletedAt: null,
  repository: "",
};

const BranchForm: React.FC<{
  branchId?: string | any;
  branchData?: IBranch;
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
      branchName: string;
      createdBy: string;
      isMerged: boolean;
      isPullRequestCreated: boolean;
      isDeleted: boolean;
      mergedAt: Date | string | null;
      pullRequestCreatedAt: Date | string | null;
      deletedAt: Date | string | null;
      repository: any;
    }>({
      defaultValues: branchFormDefaultValues,
    });

  // saving new branch or editing branch to Db
  const submitHandler = async (formData) => {
    if (!formData.isMerged) {
      formData.mergedAt = null;
    }
    if (!formData.isPullRequestCreated) {
      formData.pullRequestCreatedAt = null;
    }
    if (!formData.isDeleted) {
      formData.deletedAt = null;
    }
    console.log(formData);

    const reqOpt: any = {
      method: "POST",
      url: "/api/branches",
      data: {
        branchData: formData,
      },
    };

    if (props.branchData) {
      reqOpt.method = "PATCH";
      reqOpt.data = {
        branchId: props.branchId,
        branchData: formData,
      };
    }
    console.log(reqOpt);

    try {
      const res = await saveOrEditBranch(formData, reqOpt);
      reset(branchFormDefaultValues);
      props.onSave(res.data.success);
    } catch (error) {
      console.log(error);
    }
  };

  // setting branchData if branch is to be updated and opening model

  useEffect(() => {
    if (props.branchData) {
      reset({
        branchName: props.branchData.branchName,
        createdBy: props.branchData.createdBy?.toString(),
        isMerged: props.branchData.isMerged,
        isPullRequestCreated: props.branchData.isPullRequestCreated,
        isDeleted: props.branchData.isDeleted,
        mergedAt:
          props.branchData.mergedAt &&
          new Date(props.branchData.mergedAt).toISOString().split("T")[0],
        pullRequestCreatedAt:
          props.branchData.pullRequestCreatedAt &&
          new Date(props.branchData.pullRequestCreatedAt)
            .toISOString()
            .split("T")[0],
        deletedAt:
          props.branchData.deletedAt &&
          new Date(props.branchData.deletedAt).toISOString().split("T")[0],

        repository: props.branchData.repository,
      });
    }
  }, [props.branchData]);

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
            {...register("branchName")}
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
        <Form.Group className="mb-3 d-flex">
          <Form.Check
            {...register("isMerged")}
            className="pe-2"
            type="checkbox"
            label="Is merged?"
          />
          <Form.Check
            {...register("isPullRequestCreated")}
            className="pe-2"
            type="checkbox"
            label="Pull request?"
          />
          <Form.Check
            {...register("isDeleted")}
            type="checkbox"
            label="Deleted?"
          />
        </Form.Group>
        {getValues("isMerged") && (
          <Form.Group className="mb-3">
            <Form.Label>Merged at:</Form.Label>
            <Form.Control {...register("mergedAt")} type="date" />
          </Form.Group>
        )}
        {getValues("isPullRequestCreated") && (
          <Form.Group className="mb-3">
            <Form.Label>Pull request created at:</Form.Label>
            <Form.Control {...register("pullRequestCreatedAt")} type="date" />
          </Form.Group>
        )}
        {getValues("isDeleted") && (
          <Form.Group className="mb-3">
            <Form.Label>Deleted at:</Form.Label>
            <Form.Control {...register("deletedAt")} type="date" />
          </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Select Repository:</Form.Label>
          <Select
            options={repositoriesOptArr}
            value={repositoriesOptArr?.find(
              (repo) => repo.value === getValues("repository")
            )}
            onChange={(selectedRepo) => {
              setValue(
                "repository",
                selectedRepo ? selectedRepo.value : undefined
              );
            }}
            isClearable
          />
        </Form.Group>
        {props.branchData && (
          <Form.Group className="mb-3">
            <Form.Control type="submit" placeholder="Submit" />
          </Form.Group>
        )}
      </Form>
    </div>
  );
};

export default BranchForm;
