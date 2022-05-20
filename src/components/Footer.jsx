import { MarkGithubIcon } from "@primer/octicons-react";
import React from "react";

function Footer() {
  return (
    <div className="md:col-span-3 lg:col-span-5 bg-slate-800 text-white ">
      <div className="container mx-auto py-10 flex justify-between items-center">
        <div>
          <div className="flex gap-3 h-full items-center text-white mb-4">
            <MarkGithubIcon size={36} className="fill-white" />
            <h1 className="text-xl">Github repo Details</h1>
          </div>
          <p>© 2022</p>
        </div>
        <p>
            built with ❤️ by
            <a href="https://github.com/Code-Victor" target={'_blank'} className="hover:text-blue-400 hover:underline"> Code Victor</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
