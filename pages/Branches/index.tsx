import React from "react";
import { GetServerSideProps, NextPage } from "next";
import CustomCard from "../../components/common/CustomCard";
import { IBranch } from "../../models/Branch";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import moment from "moment";
import AddOrEditBranchForm from "../../components/Branches/AddOrEditBranchForm";

const BranchesListPage: NextPage<{
  branchList: IBranch[];
}> = (props) => {
  const router = useRouter();

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
                  onClick={(event) => {}}
                >
                  del
                </button>
              </div>
            </div>
          </CustomCard>
        ))}
      </div>
      <AddOrEditBranchForm />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const branchResponse = await fetch("http://localhost:3000/api/branches");
    const branchList = await branchResponse.json();
    return {
      props: {
        branchList,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default BranchesListPage;
