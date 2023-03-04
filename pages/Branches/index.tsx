import React from "react";
import { GetServerSideProps, NextPage } from "next";
import CustomCard from "../../components/common/CustomCard";
import { IBranch } from "../../models/Branch";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import moment from "moment";
import AddOrEditBranchForm from "../../components/Branches/AddBranchForm";
import appAxios, { AppAxiosResponse } from "../../axios/AppAxios";

const BranchesListPage: NextPage<{
  branchList: IBranch[];
}> = (props) => {
  const router = useRouter();

  const refreshPage = () => {
    router.replace(router.asPath);
  };

  const deleteBranch = async (branchId) => {
    const deleteConfirm = prompt("Are you sure?");
    if (deleteConfirm) {
      const deleteBranchRes: AppAxiosResponse = await appAxios({
        url: "/api/branches",
        method: "DELETE",
        data: {
          branchId,
        },
      });
      if (deleteBranchRes.data.success) {
        refreshPage();
      }
    }
  };

  return (
    <>
      <div className="container">
        {props.branchList.map((branch, index) => (
          <CustomCard key={index}>
            <div className="custom-card-container">
              <div
                className="custom-card-body"
                onClick={() => {
                  router.push(`/Branches/${branch._id}`);
                }}
              >
                <Card.Title>{branch.branchName}</Card.Title>

                <Card.Text>
                  <b>Created at: </b>
                  {moment(branch.createdAt).format("LL")}
                </Card.Text>
              </div>
              <div className="card-btn-container">
                <button
                  className="btn btn-primary fs-small"
                  onClick={(event) => {
                    router.push({
                      pathname: "/Branches/edit",
                      query: {
                        _id: branch._id.toString(),
                      },
                    });
                  }}
                >
                  edit
                </button>
                <br />
                <button
                  className="btn btn-danger fs-small"
                  onClick={() => deleteBranch(branch._id)}
                >
                  del
                </button>
              </div>
            </div>
          </CustomCard>
        ))}
      </div>
      <AddOrEditBranchForm
        refreshOnSave={() => {
          refreshPage();
        }}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const branchResponse: AppAxiosResponse<[IBranch]> = await appAxios(
      "http://localhost:3000/api/branches"
    );
    if (branchResponse.data.success) {
      return {
        props: {
          branchList: branchResponse.data.data,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export default BranchesListPage;
