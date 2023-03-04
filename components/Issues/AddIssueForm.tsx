import React, { useState } from "react";
import CustomModal from "../common/CustomModal";
import FloatingAddButton from "../common/FloatingAddButton";
import IssueForm from "./IssueForm";

const AddIssueForm: React.FC<{
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
        <IssueForm
          onSave={(success) => {
            if (success) {
              setSubmitModal(false);
              return setShowFormModal(false);
            }
          }}
          submitModal={submitModal}
        />
      </CustomModal>
    </>
  );
};

export default AddIssueForm;
