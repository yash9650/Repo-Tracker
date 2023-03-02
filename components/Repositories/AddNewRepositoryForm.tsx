import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import CustomModal from "../common/CustomModal";
import FloatingAddButton from "../common/FloatingAddButton";
import appAxios from "../../axios/AppAxios";

const AddNewRepositoryForm: React.FC = (props) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      repoName: "",
    },
  });

  const submitHandler = async (data) => {
    try {
      const res = await appAxios({
        method: "POST",
        url: "/api/repositories",
        data,
      });
      setShowFormModal(false);
      reset({
        repoName: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        onSave={async () => {
          handleSubmit(submitHandler)();
        }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Repository name</Form.Label>
            <Form.Control
              {...register("repoName")}
              type="text"
              placeholder="Enter repo name..."
            />
          </Form.Group>
        </Form>
      </CustomModal>
    </>
  );
};

export default AddNewRepositoryForm;
