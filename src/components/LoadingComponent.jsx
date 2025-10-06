import React from 'react'

const LoadingComponent = () => {
  return (
    <div className='fixed w-full h-full flex items-center justify-center z-[100000000] bg-slate-300'>
        <img alt="img" className='' src='/gifloading.GIF'/>
    </div>
  )
}

export default LoadingComponent