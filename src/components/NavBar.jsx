import { MarkGithubIcon, ThreeBarsIcon } from "@primer/octicons-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth, useSigninCheck, useUser } from "reactfire";

function NavBar() {
  const user = useUser();
  const { status, data: signInCheckResult } = useSigninCheck();
  const { pathname } = useLocation();
  const auth = useAuth();
  console.log("pathname", pathname);
  console.log(user)
  function logout() {
    auth.signOut().then(() => {
      console.log("successfully signed out");
    });
  }
  return (
    <div className="flex h-24 bg-slate-800 conatiner mx-auto px-2 justify-between items-center">
      <Link to="/">
        <div className="flex gap-3 h-full items-center text-white">
          <MarkGithubIcon size={36} className="fill-white" />
          <h1 className="text-xl">Github repo Details</h1>
        </div>
      </Link>
      {status !== "loading" &&
        (signInCheckResult.signedIn === true ? (
          <div className="space-x-2">
            <button
              onClick={logout}
              className="bg-red-700 rounded-lg text-white px-6 py-2 text-lg font-semibold  h-[50%] hover:bg-red-600 focus:ring-1 ring-white"
            >
              log out
            </button>
            <button className="bg-slate-800 border border-slate-400 px-4 py-2 rounded-lg focus:ring-1 ring-white hover:shadow-lg shadow-gray-200">
              <ThreeBarsIcon size={16} className="fill-white" />
            </button>
          </div>
        ) : (
          pathname !== "/login" && (
            <Link to="/login">
              <button className="bg-green-700 rounded-lg text-white px-6 py-2 text-lg font-semibold  h-[50%] hover:bg-green-600 focus:ring-1 ring-white">
                log in
              </button>
            </Link>
          )
        ))}
    </div>
  );
}

export default NavBar;
