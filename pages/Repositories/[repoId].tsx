import Head from "next/head";
import React, { useState } from "react";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import CustomCard from "../../components/common/CustomCard";
import AddOrEditBranchInRepoForm from "../../components/Repositories/AddOrEditBranchInRepoForm";
import { IRepo } from "../../models/Repository";
import { Card } from "react-bootstrap";
import moment from "moment";
import { useRouter } from "next/router";
import appAxios from "../../axios/AppAxios";
import { IBranch } from "../../models/Branch";

const RepositoryDetailPage: NextPage<{
  repoData: IRepo;
}> = (props) => {
  const router = useRouter();
  const [editBranchDetails, setEditBranchDetails] = useState<IBranch>();
  return (
    <React.Fragment>
      <div className="container">
        {props.repoData.branches.map((branch, index) => (
          <CustomCard key={index}>
            <div className="custom-card-container">
              <div
                className="custom-card-body"
                onClick={() => {
                  // router.push("/")
                }}
              >
                <Card.Title>{branch.branchName}</Card.Title>
                <Card.Body>
                  <div>
                    <b>Created by: </b>
                    <p> {branch.createdBy} </p>
                    <b>Created at: </b>
                    {moment(branch.createdAt).format("LL")}
                  </div>
                </Card.Body>
              </div>
              <div className="card-btn-container">
                <button
                  className="btn btn-primary fs-small"
                  onClick={() => {
                    setEditBranchDetails(branch);
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
      <AddOrEditBranchInRepoForm
        repoId={router.query.repoId}
        branchData={editBranchDetails}
        resetBranchDate={() => {
          setEditBranchDetails(null);
        }}
      />
    </React.Fragment>
  );
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  const repoList = await appAxios("/api/repositories");
  const paths = repoList.data.map((repo) => {
    return {
      params: { repoId: repo._id },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const repoData = await appAxios({
      url: `http://localhost:3000/api/repositories/${context.params.repoId}`,
      //   params: {
      //     _id: context.params.repoId,
      //   },
    });
    return {
      props: {
        repoData: repoData.data,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      repoData: [],
    },
  };
};

export default RepositoryDetailPage;
