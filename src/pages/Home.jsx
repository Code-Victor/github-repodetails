import {
  LinkIcon,
  LocationIcon,
  OrganizationIcon,
  PeopleIcon,
} from "@primer/octicons-react";
import { ThreeBody } from '@uiball/loaders'
import { data } from "autoprefixer";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useSigninCheck, useUser } from "reactfire";
import { Avatar, Follow, RepoDetails, Search, TabBar,Footer } from "../components";
import {
  useGetReposPPageQuery,
  useGetReposQuery,
  useGetStarsQuery,
  useGetUserQuery,
} from "../services/githubApi";

const Home = () => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const uid = useUser().data?.providerData[0]?.uid;
  const [page,setPage]=useState(1)

  const navigator = useNavigate();
  const {
    data: repos,
    isLoading: repoLoading,
    isError: repoError,
  } = useGetReposQuery(uid);
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserQuery(uid);
  const {
    data: stars,
    isLoading: starLoading,
    isError: starError,
  } = useGetStarsQuery(uid);

  useEffect(() => {
    console.log("hey");
    if (status === "success") {
      if (!signInCheckResult?.signedIn) {
        navigator("/login");
      }1
    }
  }, [status,signInCheckResult]);

  console.log("uid", uid);
  if (repoLoading || userLoading || starLoading || status === "loading") {
    return <div className="min-h-[90vh] min grid place-items-center">
      <ThreeBody size={100} color={'#1e293b'} /></div>;
    //TODO: add a loading component
  }
  if (userError||repoError||starError||status === "error") {
    return <div>Error</div>;
  }
  return (
    <section className="md:grid md:grid-cols-3 lg:grid-cols-5 custom-rows">
      <section className="container mx-auto px-2 mt-2 md:col-span-1 md:row-span-1 lg:col-span-2">
        <div className="flex md:flex-col md:items-baseline items-center gap-4 md:max-w-[250px] lg:max-w[350px] md:ml-auto ">
          <Avatar
            src={user.avatar_url}
            className={"md:w-56 md:h-56 lg:w-64 lg:h-64 md:-mt-[10%] z-10"}
            main={true}
          />
          <div>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-xl text-gray-600">{user.login}</p>
            {user.bio && <p className="hidden md:block my-3">{user.bio}</p>}
            <div className="hidden md:flex gap-2 items-center mb-3">
              <PeopleIcon size={16} />
              <div className="flex ">
                <Follow number={user.followers} follower />
                <span>·</span>
                <Follow number={user.following} follower={false} />
              </div>
            </div>
            <div className="hidden md:block">
              {user.company && (
                <div className="flex gap-4 items-center">
                  <OrganizationIcon size={16} />
                  <span>{user.company}</span>
                </div>
              )}
              {user.location && (
                <div className="flex gap-4 items-center">
                  <LocationIcon size={16} />
                  <span>{user.location}</span>
                </div>
              )}
              {user.blog && (
                <div className="flex gap-4 items-center">
                  <LinkIcon size={16} />
                  <a
                    className="hover:text-blue-500 hover:underline"
                    href={user.blog}
                  >
                    <span>{user.blog}</span>
                  </a>
                </div>
              )}
              {user.twitter_username && (
                <div className="flex gap-4 items-center">
                  <TwiiterIcon />
                  <a
                    className="hover:text-blue-500 hover:underline"
                    href={`https://twitter.com/${user.twitter_username}`}
                  >
                    <span>@{user.twitter_username}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {user.bio && <p className="block md:hidden my-3">{user.bio}</p>}
          {user.blog && (
            <div className="flex md:hidden gap-4 items-center mb-1">
              <LinkIcon size={16} />
              <a
                className="hover:text-blue-500 hover:underline"
                href={user.blog}
              >
                <span>{user.blog}</span>
              </a>
            </div>
          )}
          <div className="flex md:hidden gap-2 items-center mb-3">
            <PeopleIcon size={16} />
            <div className="flex ">
              <Follow number={user.followers} follower />
              <span>·</span>
              <Follow number={user.following} follower={false} />
            </div>
          </div>
        </div>
      </section>
      <TabBar
        active={1}
        data={{ Repositories: user.public_repos, Stars: stars.length }}
      />

      <RepoDetails repos={repos}  />
      <Footer/>
      {/* <div>
        {JSON.stringify(repos)}
      </div> */}
    </section>
  );
  //TODO: create a component to display the data
};
export default Home;

function TwiiterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 273.5 222.3"
      role="img"
      height={16}
      width={16}
      aria-labelledby="6uqw3pq1xzsn4dlbgz1xoi26jm5zz4"
    >
      <title id="6uqw3pq1xzsn4dlbgz1xoi26jm5zz4">Twitter</title>
      <path
        d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
        fill="currentColor"
      ></path>
    </svg>
  );
}
