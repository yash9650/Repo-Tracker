import Head from "next/head";
import React, { useState } from "react";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import CustomCard from "../../components/common/CustomCard";
import { IRepo } from "../../models/Repository";
import { Card } from "react-bootstrap";
import moment from "moment";
import { useRouter } from "next/router";
import appAxios, { AppAxiosResponse } from "../../axios/AppAxios";
import { IBranch } from "../../models/Branch";

const RepositoryDetailPage: NextPage<{
  repoData: IRepo;
}> = (props) => {
  const router = useRouter();
  const [editBranchDetails, setEditBranchDetails] = useState<IBranch>();
  return (
    <React.Fragment>
      <div className="container">
        {props.repoData.branches?.map((branch, index) => (
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
                    <p> {branch.createdBy?.toString()} </p>
                    <b>Created at: </b>
                    {moment(branch.createdAt).format("LL")}
                  </div>
                </Card.Body>
              </div>
              <div className="card-btn-container">
                <button
                  className="btn btn-primary fs-small"
                  onClick={() => {
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
    </React.Fragment>
  );
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  const repoList = await appAxios("/api/repositories");
  const paths = repoList.data.data.map((repo) => {
    return {
      params: { repoId: repo._id },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const repoResponse: AppAxiosResponse<IRepo> = await appAxios(
      `/api/repositories/${context.params.repoId}`
    );
    if (repoResponse.data.success) {
      return {
        props: {
          repoData: repoResponse.data.data,
        },
        revalidate: 3000,
      };
    }
  } catch (error) {}
  return {
    props: {
      repoData: [],
    },
  };
};

export default RepositoryDetailPage;
