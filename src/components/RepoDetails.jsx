import React, { useState } from "react";
import RepoInfoContainer from "./RepoInfoContainer";
import Search from "./Search";

function RepoDetails({ repos }) {
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState("Last updated");
  return (
    <section className="md:col-span-2 lg:col-span-3">
      <Search repos={repos} setters={{setLanguage,setSort}} state={{language,sort}} />
      <RepoInfoContainer repos={repos}/>
    </section>
  );
}

export default RepoDetails;
