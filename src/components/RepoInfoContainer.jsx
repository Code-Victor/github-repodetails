import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RepoInfoCard from "./RepoInfoCard";

function RepoInfoContainer({ repos }) {
  const updatedRepo=[...repos].sort((a,b)=>{
    let da=new Date(a.pushed_at);
    let db=new Date(b.pushed_at)
    return db.valueOf()-da.valueOf()
  });
  const [displayRepos, setDisplayRepos] = useState(updatedRepo);
  const [page,setPage]=useState(1)
  const noPerPage=15
  const maxPage=Math.ceil(displayRepos.length/noPerPage)
  console.log('maxPage',maxPage)
  const [search, setSearch] = useSearchParams();
  useEffect(() => {
    console.log("repocontain", search.get("title"));
    const timeout = setTimeout(() => {
      setDisplayRepos(() => {
        let newRepo = updatedRepo;
        const title = search.get("title");
        const sort = search.get("sort");
        const language = search.get("language");
        if (title) {
          newRepo = newRepo.filter((repo) =>
            repo.name.toLowerCase().includes(title.toLowerCase())
          );
        }
        if (language) {
          newRepo = newRepo.filter((repo) => {
            if (language.toLowerCase() === "all") {
              return true;
            }
            return repo.language?.toLowerCase() === language.toLowerCase();
          });
        }
        if (sort) {
          if (sort === "Last updated") {
            newRepo = newRepo.sort((a, b) => {
              let da = new Date(a.pushed_at);
              let db = new Date(b.pushed_at);
              return db.valueOf() - da.valueOf();
            });
          }
          if (sort === "Stars") {
            newRepo = newRepo.sort((a, b) => {
              return b.stargazers_count - a.stargazers_count;
            });
          }
        }
        setPage(1)
        return newRepo;
      });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="p-2">
      {displayRepos.slice((page-1)*noPerPage,page*noPerPage).map((repo) => {
        return <RepoInfoCard repo={repo} />;
      })}
      {displayRepos.length>=noPerPage&&<div className="flex w-full justify-center my-8 max-w-[900px]">
        <div className="rounded  grid grid-cols-2">
          <button className={`bg-gray-50 hover:bg-gray-100 py-3 rounded-l-xl pr-2 pl-4 font-semibold hover:text-blue-400 border border-gray-400 disabled:bg-gray-100 disabled:text-gray-600 disabled:hover:text-gray-600`} disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button>
          <button className={`bg-gray-50 hover:bg-gray-100 py-3 rounded-r-xl pl-2 pr-4 font-semibold hover:text-blue-400 border border-gray-400 disabled:bg-gray-100 disabled:text-gray-600 disabled:hover:text-gray-600`} disabled={page===maxPage} onClick={()=>setPage(page+1)} >Next</button>
        </div>
      </div>}
    </div>
  );
}

export default RepoInfoContainer;
