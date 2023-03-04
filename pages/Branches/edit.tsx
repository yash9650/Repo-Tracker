import { NextPage } from "next";
import React from "react";
import appAxios, { AppAxiosResponse } from "../../axios/AppAxios";
import { IBranch } from "../../models/Branch";
import BranchForm from "../../components/Branches/BranchForm";
import { useRouter } from "next/router";

const editBranchPage: NextPage<{
  branchData: IBranch;
}> = (props) => {
  const router = useRouter();

  const onSave = () => {
    router.back();
  };
  return (
    <BranchForm
      branchData={props.branchData}
      branchId={props.branchData._id}
      onSave={onSave}
    />
  );
};

export const getServerSideProps = async (context) => {
  try {
    const _id = context.query._id;
    const branchResponse: AppAxiosResponse<IBranch> = await appAxios(
      `/api/branches/${_id}`
    );
    if (branchResponse.data.success) {
      return {
        props: {
          branchData: branchResponse.data.data,
        },
      };
    }
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default editBranchPage;
