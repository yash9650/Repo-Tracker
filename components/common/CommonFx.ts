import appAxios, { AppAxiosResponse } from "../../axios/AppAxios";
import { IBranch } from "../../models/Branch";
import { IRepo } from "../../models/Repository";

export const getRepo = async () => {
  try {
    const repo: AppAxiosResponse<[IRepo]> = await appAxios("/api/repositories");
    const optArr = repo.data.data.map((repo) => {
      return {
        label: repo.repoName,
        value: repo._id,
      };
    });
    return optArr;
  } catch (error) {
    return false;
  }
};

// saving new branch or editing branch to Db
export const saveOrEditBranch = async (formData, reqOpt) => {
  return (await appAxios(reqOpt)) as AppAxiosResponse<IBranch>;
};
