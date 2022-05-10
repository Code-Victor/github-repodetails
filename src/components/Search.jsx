import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Dropdown from "./Dropdown";
import HorizontalRule from "./HorizontalRule";

function Search({ repos, setters, state }) {
  const [mounted,setMounted] = useState(false);
  const [search, setSearch] = useSearchParams({
    title: "",
    sort: "Last updated",
    language: "All",
  });
  console.log("search", search);
  const languageList = [
    "All",
    ...new Set(
      repos
        .filter((repo) => repo.language)
        .map((repo) => {
          return repo.language;
        })
    ),
  ];
  useEffect(() => {

    if(mounted){setSearch({
      title: search.get('title'),
      sort: state.sort,
      language: state.language,
    })}
    setMounted(true);
    
  }, [state.language, state.sort]);
  function handleInputSearch(e) {
    setSearch({
      title: e.target.value,
      sort: state.sort,
      language: state.language,
    });
  }
  const sortList = ["Last updated", "Name", "Stars"];
  console.log("language", languageList);
  return (
    <div className="px-2">
      <div className="max-w-[900px] md:flex md:items-center gap-4">
        <form className=" md:flex-1">
          <input
            type="text"
            className="border-2 focus:ring-blue-500 focus:ring-2 focus:outline-none w-full  bg-transparent rounded-lg mt-3 p-2 placeholder:text-slate-800 "
            placeholder="Find a repository..."
            value={search.get("title")}
            onChange={(e) => handleInputSearch(e)}
          />
          <div></div>
        </form>
        <div className="flex gap-2 mt-2 mb-4 md:my-auto md:items-center md:h-full">
          <Dropdown
            Name="Language"
            header={"Select language"}
            data={languageList}
            setter={setters.setLanguage}
            state={state.language}
          />
          <Dropdown
            Name="Sort"
            header="Select order"
            data={sortList}
            setter={setters.setSort}
            state={state.sort}
          />
        </div>
        <HorizontalRule className="max-w-[900px]" />
      </div>
    </div>
  );
}

export default Search;
