import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import appAxios from "../../axios/AppAxios";
import Select from "react-select";

const defaultValues = {
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

const editBranchPage: NextPage = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [repositoriesOptArr, setRepositoriesOptArr] = useState<
    [
      {
        label: string;
        value: string;
      }
    ]
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
      defaultValues: defaultValues,
    });

  // saving new branch or editing branch to Db
  const submitHandler = async (formData) => {
    if (!formData.isMerged) {
      formData.mergedAt = undefined;
    }
    if (!formData.isPullRequestCreated) {
      formData.pullRequestCreatedAt = undefined;
    }
    if (!formData.isDeleted) {
      formData.deletedAt = undefined;
    }

    // try {
    //   const res = await appAxios({
    //     method: "POST",
    //     url: "/api/branches",
    //     data: {
    //       branchData: formData,
    //     },
    //   });
    //   console.log(res);

    //   reset(defaultValues);
    //   setShowFormModal(false);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // getting repositories
  const getRepo = async () => {
    try {
      const repo = await appAxios("/api/repositories");
      const optArr = repo.data.map((repo) => {
        return {
          label: repo.repoName,
          value: repo._id,
        };
      });
      setRepositoriesOptArr(optArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRepo();
  }, []);

  const watchForm = watch();

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
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
      <Form.Group className="mb-3">
        <Form.Control type="submit" placeholder="Submit" />
      </Form.Group>
    </Form>
  );
};

export default editBranchPage;
