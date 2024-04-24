'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import ReviewList from './ReviewList'

function ReviewSection({restaurant}) {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState();
  const [reviewList, setReviewList] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(()=>{
    getRestaurantReviews();
  },[update])

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      reviewText: reviewText,
      star: rating,
      userName: user?.fullName,
      profileImage: user?.imageUrl,
      slug: restaurant?.slug
    }

    GlobalApi.addReview(data).then(resp=>{
      setUpdate(!update);
      if(resp){
        setRating(0);
        setReviewText('');
        toast('Rating and Review Submitted!')
      }
    })
  }

  const getRestaurantReviews = () => {
    GlobalApi.getRestaurantReviews(restaurant?.slug).then(resp=>{
      setReviewList(resp?.reviews);
    })
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
        <div className='p-5 shadow-lg border rounded-xl'>
           <h2 className='font-bold text-lg'>Add your review</h2>
           <form onSubmit={handleSubmit}>
           <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} className="mt-5 mb-2"/>
           <Textarea value={reviewText} onChange={(e)=> setReviewText(e.target.value)}/>
          <Button disabled={rating==0 || reviewText==''} 
          className="mt-3"
          type='submit'
          >Submit</Button>
          </form>
        </div>
        <div className='col-span-2'>
            <ReviewList reviewList={reviewList}/>
        </div>
    </div>
  )
}

export default ReviewSection