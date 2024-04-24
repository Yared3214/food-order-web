import Image from 'next/image'
import React, { useEffect } from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import moment from 'moment'


function ReviewList({reviewList}) {
  return (
  <div className='flex flex-col gap-5'>
        { !reviewList ? 
        [0,1,2,3].map((item, index)=>(
          <div key={index} className='h-[100px] w-full border rounded-lg bg-slate-200 animate-pulse'>
            </div>
        )) :
         reviewList.map((review, index)=>(
          <div key={index} className='flex gap-5 items-center rounded-lg border p-5'>
              <Image src={review?.profileImage}
              alt='Profile Image'
              width={50}
              height={50}
              className='rounded-full'/>
              <div>
                  <h2>{review?.reviewText}</h2>
                  <ReactRating style={{ maxWidth: 100 }} 
                  value={review?.star} 
                  isDisabled={true}/>
                  <h2 className='text-sm'><span className='font-bold'>{review?.userName}</span> at {moment(review?.publishedAt).format('DD-MMM-YYYY')}</h2>
                  </div>
              </div>
      ))}
    </div>
  )
}

export default ReviewList