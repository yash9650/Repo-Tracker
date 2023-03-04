import React, { useState } from "react";
import CustomModal from "../common/CustomModal";
import FloatingAddButton from "../common/FloatingAddButton";
import BranchForm from "./BranchForm";

const AddBranchForm: React.FC<{
  refreshOnSave: () => void;
}> = (props) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);

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
          setShowFormModal(false);
        }}
        onSave={() => {
          setSubmitModal(true);
        }}
      >
        <BranchForm
          onSave={(success) => {
            if (success) {
              setShowFormModal(false);
              props.refreshOnSave();
            }
            setSubmitModal(false);
          }}
          submitModal={submitModal}
        />
      </CustomModal>
    </>
  );
};

export default AddBranchForm;

// const [repositoriesOptArr, setRepositoriesOptArr] = useState<
//     {
//       label: string;
//       value: mongoose.Schema.Types.ObjectId;
//     }[]
//   >();
//   const { register, handleSubmit, getValues, setValue, reset, watch } =
//     useForm<{
//       branchName: string;
//       createdBy: string;
//       isMerged: boolean;
//       isPullRequestCreated: boolean;
//       isDeleted: boolean;
//       mergedAt: Date | string | null;
//       pullRequestCreatedAt: Date | string | null;
//       deletedAt: Date | string | null;
//       repository: any;
//     }>({
//       defaultValues: branchFormDefaultValues,
//     });

//   // saving new branch or editing branch to Db
//   const submitHandler = async (formData) => {
//     if (!formData.isMerged) {
//       formData.mergedAt = undefined;
//     }
//     if (!formData.isPullRequestCreated) {
//       formData.pullRequestCreatedAt = undefined;
//     }
//     if (!formData.isDeleted) {
//       formData.deletedAt = undefined;
//     }

//     const reqOpt: any = {
//       method: "POST",
//       url: "/api/branches",
//       data: {
//         branchData: formData,
//       },
//     };

//     try {
//       const res = await saveOrEditBranch(formData, reqOpt);
//       reset(branchFormDefaultValues);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       const optArr = await getRepo();
//       optArr && setRepositoriesOptArr(optArr);
//     })();
//   }, []);

//   const watchForm = watch();

{
  /* <Form>
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
        </Form> */
}
