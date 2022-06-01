import { Popover, Transition } from "@headlessui/react";
import {
  AppsIcon,
  ArrowUpRightIcon,
  FeedHeartIcon,
  MarkGithubIcon,
  SignOutIcon,
  ThreeBarsIcon,
  ThumbsupIcon,
  XIcon,
} from "@primer/octicons-react";
import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth, useSigninCheck, useUser } from "reactfire";
import { useGetUserQuery } from "../services/githubApi";
import Avatar from "./Avatar";

function NavBar({ mode, setMode }) {
  const user = useUser();
  const { status, data: signInCheckResult } = useSigninCheck();
  const { pathname } = useLocation();
  const auth = useAuth();
  console.log("pathname", pathname);
  console.log(user);
  function logout() {
    auth.signOut().then(() => {
      console.log("successfully signed out");
    });
  }
  return (
    <nav className="flex h-16 bg-slate-800 conatiner mx-auto px-2 justify-between items-center">
      <Link to="/" aria-label="Github repo checker logo">
        <div className="flex gap-3 h-full items-center text-white">
          <MarkGithubIcon size={36} className="fill-white" />
          <h1 className="text-xl">Github repo Details</h1>
        </div>
      </Link>
      {status !== "loading" &&
        (signInCheckResult.signedIn === true ? (
          <div className=" flex gap-2 items-center">
            <ModeChanger mode={mode} setMode={setMode} />
            <NavMenu logout={logout} />
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
    </nav>
  );
}
function ModeChanger({ mode, setMode }) {
  return (
    <>
      {mode ? (
        <button aria-label="Switch to dark mode" onClick={() => setMode(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 stroke-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      ) : (
        <button aria-label="Switch to light mode" onClick={() => setMode(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 stroke-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      )}
    </>
  );
}
function NavMenu({ logout }) {
  const uid = useUser().data?.providerData[0]?.uid;
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserQuery(uid);
  const solutions = [
    {
      name: "Launch in github",
      description: "open your github page in a new tab",
      href: user?.html_url,
      icon: ArrowUpRightIcon,
    },
    {
      name: "Support",
      description: "starring this repository will go along way to support us",
      href: "https://github.com/Code-Victor/github-repodetails",
      icon: ThumbsupIcon,
    },
    {
      name: "Log out",
      description: "Log out from this application",
      href: "##",
      icon: SignOutIcon,
    },
  ];
  return (
    <Popover className={"md:relative"}>
      {({ open }) => (
        <>
          <Popover.Button
            aria-label="Navigation menu"
            className={`
            ${
              open ? "open " : "text-opacity-90"
            } bg-slate-800 border border-slate-400 px-4 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75   hover:shadow-lg shadow-gray-200`}
          >
            <ThreeBarsIcon size={16} className="fill-white" />
          </Popover.Button>
          <Popover.Overlay
            className={
              "fixed inset-0 bg-black opacity-30 md:hidden z-10 cursor-none"
            }
          />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] md:right-0 md:translate-x-0 md:translate-y-0 md:top-12 w-screen max-w-sm  transform px-4 sm:px-0 lg:max-w-3xl z-40">
              {({ close }) => (
                <>
                  <button className="block ml-auto" onClick={() => close()}>
                    <XIcon
                      size={24}
                      className="fill-white hover:fill-gray-600 "
                    />
                  </button>
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-8 bg-white dark:bg-gray-800 p-7 lg:grid-cols-2">
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          {...(item.href?.includes("#")
                            ? { onClick: () => logout() }
                            : { target: "_blank" })}
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                            <item.icon
                              className="fill-black dark:fill-white"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4">
                      <a
                        href="##"
                        className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-blue -500 focus-visible:ring-opacity-50"
                      >
                        <span className="flex items-center gap-4">
                          <Avatar
                            src={user?.avatar_url}
                            className="w-12 h-12"
                            name={user?.name}
                          />
                          <a
                            className="block text-sm text-gray-500 dark:text-gray-400 hover:text-blue-400 hover:underline"
                            href={user?.html_url}
                          >
                            {user?.name}
                          </a>
                        </span>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default NavBar;
