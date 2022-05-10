import React from 'react'

function Follow({number,follower}) {
  return (
    <span className='flex gap-0.5' >
        <h3 className="bold">{number}</h3>
        <p className='text-gray-500'>{follower?'follower':'following'}</p>
    </span>
  )
}

export default Follow