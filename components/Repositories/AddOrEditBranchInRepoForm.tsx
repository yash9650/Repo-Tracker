import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import CustomModal from "../common/CustomModal";
import FloatingAddButton from "../common/FloatingAddButton";
import appAxios from "../../axios/AppAxios";
import { IBranch } from "../../models/Branch";
import Select from "react-select";
import moment from "moment";

const defaultValues = {
  branchName: "",
  createdBy: "",
  isMerged: false,
  isPullRequestCreated: false,
  isDeleted: false,
  mergedAt: null,
  pullRequestCreatedAt: null,
  deletedAt: null,
  repository: undefined,
};

const AddOrEditBranchInRepoForm: React.FC<{
  repoId: string | any;
  branchData?: IBranch;
  resetBranchDate?: () => void;
}> = (props) => {
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
  const submitHandler = async (data) => {
    if (!data.isMerged) {
      data.mergedAt = undefined;
    }
    if (!data.isPullRequestCreated) {
      data.pullRequestCreatedAt = undefined;
    }
    if (!data.isDeleted) {
      data.deletedAt = undefined;
    }

    try {
      const res = await appAxios({
        method: "PATCH",
        url: "/api/repositories",
        data: {
          repoId: props.repoId,
          branchData: data,
        },
      });
      reset(defaultValues);
      setShowFormModal(false);
    } catch (error) {
      console.log(error);
    }
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

  // setting branchData if branch is to be updated and opening model
  useEffect(() => {
    if (props.branchData) {
      setShowFormModal(true);
      reset({
        branchName: props.branchData.branchName,
        createdBy: props.branchData.createdBy,
        isMerged: props.branchData.isMerged,
        isPullRequestCreated: props.branchData.isPullRequestCreated,
        isDeleted: props.branchData.isDeleted,
        mergedAt: props.branchData.mergedAt,
        pullRequestCreatedAt: new Date(props.branchData.pullRequestCreatedAt)
          .toISOString()
          .split("T")[0],
        deletedAt: props.branchData.deletedAt,
        repository: props.branchData.repository,
      });
    }
  }, [props.branchData]);

  useEffect(() => {
    getRepo();
  }, []);

  useEffect(() => {
    if (props.repoId) {
      setValue("repository", props.repoId);
    }
  }, [props.repoId]);

  const watchForm = watch();

  return (
    <>
      <FloatingAddButton
        onclick={() => {
          setShowFormModal(true);
        }}
      />
      <CustomModal
        show={showFormModal}
        onClose={() => {
          const resetValues = defaultValues;
          if (props.repoId) {
            resetValues.repository = props.repoId;
          }
          reset(resetValues);
          setShowFormModal(false);
          props.branchData && props.resetBranchDate();
        }}
        onSave={async () => {
          handleSubmit(submitHandler)();
        }}
      >
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
              // {...register("repository")}
              value={repositoriesOptArr?.find(
                (repo) => repo.value === getValues("repository")
              )}
              onChange={(selectedRepo) => {
                setValue(
                  "repository",
                  selectedRepo ? selectedRepo.value : undefined
                );
              }}
              isDisabled={props.repoId}
              isClearable
            />
          </Form.Group>
        </Form>
      </CustomModal>
    </>
  );
};

export default AddOrEditBranchInRepoForm;
