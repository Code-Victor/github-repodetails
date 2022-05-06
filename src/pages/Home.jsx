import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useAuth, useSigninCheck, useUser } from "reactfire";
import { useGetReposQuery, useGetReposWnameQuery } from "../services/githubApi";

const Home = () => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const uid = useUser().data?.providerData[0]?.uid;
  const { data, isLoading, isError } = useGetReposQuery(uid);
  console.log(data, isLoading, isError);
  if ((isLoading && !data) || isError) {
    return <div>Loading...</div>;
    //TODO: add a loading component
  }
  return <div>{JSON.stringify(data)}</div>;
  //TODO: create a component to display the data
};
export default Home;
