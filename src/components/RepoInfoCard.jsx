import React from "react";
import HorizontalRule from "./HorizontalRule";
import LanguageBadge from "./LanguageBadge";
import { dateConverter, substractDate } from "../util";
import { StarIcon } from "@primer/octicons-react";
function RepoInfoCard({ repo }) {
  function handleDates() {
    const convertedDate = new dateConverter(substractDate(repo.pushed_at));
    if (convertedDate.toDays() < 1) {
      return "yesterday";
    }
    if (convertedDate.toDays() > 10) {
      return `on ${new Date(repo.pushed_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`;
    }
    return `${Math.floor(convertedDate.toDays())} days ago`;
  }
  return (
    <>
      <div className="flex items-center py-3 md:py-6 max-w-[900px]">
        <div className="flex flex-1 ">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              <a
                href={repo.html_url}
                className="text-xl text-blue-600 font-semibold"
              >
                {repo.name}
              </a>
              <OutlinedButton Content={"Public"} />
            </div>
            <div className="flex mt-2 gap-2">
              <LanguageBadge language={repo.language} />
              <div>updated {handleDates()}</div>
            </div>
          </div>
        </div>
        <div className="">
          <a href={`https://github.com/${repo.full_name}/`} target="_blank">
            <button className="py-1 px-3 flex gap-1 border-gray-300 border rounded-lg items-center border-solid bg-gray-50 hover:bg-gray-100">
            <StarIcon size={18} className='fill-gray-600'/>
              <span className="font-semibold">Star</span>
            </button>
          </a>
        </div>
      </div>
      <HorizontalRule className="max-w-[900px]" />
    </>
  );
}
function OutlinedButton({ Content }) {
  return (
    <button className="text-sm font-semibold  px-1 border border-gray-300 rounded-xl">
      {Content}
    </button>
  );
}

export default RepoInfoCard;
