import React, { useContext } from "react";
import { useInViewport } from "react-in-viewport";
import { useUser } from "reactfire";
import { ViewContext } from "../context/viewContext";
import { useGetUserQuery } from "../services/githubApi";
import Avatar from "./Avatar";
import HorizontalRule from "./HorizontalRule";

const tabItems = [
  {
    name: "Overview",
    data: false,
  },
  {
    name: "Repositories",
    data: true,
  },
  {
    name: "Projects",
    data: false,
  },
  {
    name: "Packages",
    data: false,
  },
  {
    name: "Stars",
    data: true,
  },
];
function TabBar({ active, data }) {
  const uid = useUser().data?.providerData[0]?.uid;
  let {inView}=useContext(ViewContext)
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserQuery(uid);
  return (
    <nav className="sticky top-0 md:col-start-1 md:row-start-1  md:col-span-3 lg:col-span-5 md:grid md:grid-cols-3 lg:grid-cols-5 bg-white">
      <div className="bg-white lg:col-span-2">
        <div className={`hidden md:flex gap-4 justify-center items-center h-full transition-opacity ${inView?'opacity-0':'opacity-100'}`}>
          <Avatar src={user?.avatar_url} className="w-10 h-10"/>
          <h1 className="font-semibold">{user?.login}</h1>
        </div>
      </div>
      <div className="flex w-full mt-2 sticky top-0 bg-white pb-2  md:col-span-2 lg:col-span-3 max-w-[700px] mr-auto">
        {tabItems.map((tabItem, index) => {
          return (
            <div className="flex-1 h-full ">
              <div className="flex  items-center border-b-2 border-transparent justify-center py-2 gap-0.5 hover:bg-gray-300 rounded-lg">
                <h1 className="text-xs md:text-sm font-semibold ">{tabItem.name}</h1>
                {tabItem.data && <Badge data={data[tabItem.name]} />}
              </div>
              <div
                className={`h-0.5 ${active === index ? "bg-red-500" : ""}`}
              ></div>
            </div>
          );
        })}
      </div>
      <HorizontalRule className="col-span-3 z-10 lg:col-span-5" />
    </nav>
  );
}
function Badge({ data }) {
  return (
    <div className="px-1 text-sm rounded-2xl bg-gray-300 text-black">
      {data}
    </div>
  );
}
export default TabBar;
