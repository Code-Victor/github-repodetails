import React, { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CheckIcon, TriangleDownIcon, XIcon } from "@primer/octicons-react";
import { useSearchParams } from "react-router-dom";

const Dropdown = ({ Name, header, data, setter, state }) => {
  // const [search,setSearch]=useSearchParams({title:'',sort:'Last updated',language:'All'})
  // useEffect(()=>{
  //   setSearch({...search,language:state})
  // },[state])
  return (
    <Popover className={"md:relative"}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`py-1 px-3 flex gap-1 border-gray-300 border rounded-lg items-center border-solid bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-50 dark:border-gray-500`}
          >
            <span className="text-[15px] font-semibold">{Name}</span>
            <TriangleDownIcon size={18} />
          </Popover.Button>
          <Popover.Overlay
            className={"fixed inset-0 bg-black opacity-30 md:hidden z-10"}
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
            <Popover.Panel
              className={
                "w-[90%] md:w-[300px]  mx-auto z-20 absolute top-[50%] md:top-10 md:left-auto md:right-0 left-[50%] -translate-x-[50%] md:translate-x-0 md:translate-y-0 -translate-y-[50%] divide-y rounded-xl bg-white overflow-clip md:shadow-xl border border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-500 dark:divide-gray-500"
              }
            >
              {({ close }) => (
                <>
                  <div className="flex justify-between px-3 py-4 md:p-2 md:pl-4">
                    <h1 className="text-sm font-semibold">{header}</h1>
                    <button onClick={() => close()}>
                      <XIcon
                        size={16}
                        className="fill-gray-500 hover:fill-gray-600"
                      />
                    </button>
                  </div>
                  <div className="divide-y dark:divide-gray-500">
                    {data.map((datum) => (
                      <button
                        className="px-3 py-4 md:p-2 md:pl-4 hover:bg-gray-100 dark:hover:bg-gray-700 block w-full"
                        onClick={() => setter(datum)}
                      >
                        <CheckIcon
                          size={16}
                          className={`mr-3 ${
                            state === datum ? "opacity-1" : "opacity-0"
                          }`}
                        />
                        <span>{datum}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Dropdown;
