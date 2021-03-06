import React from 'react'

function HorizontalRule({className=""}) {
  return (
    <div className={`${className} h-[1px] bg-gray-300 dark:bg-gray-700`}></div>
  )
}

export default HorizontalRule