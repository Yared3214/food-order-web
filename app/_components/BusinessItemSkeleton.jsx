import React from 'react'

function BusinessItemSkeleton() {
  return (
    <div>
        <div className='bg-slate-200 rounded-xl w-full h-[130px] animate-pulse'>
        </div>
        <div className='bg-slate-200 rounded-md w-full h-5 animate-pulse mt-3'>
        </div>
    </div>
  )
}

export default BusinessItemSkeleton