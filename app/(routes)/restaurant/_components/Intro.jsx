import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react';

function Intro({restaurant}) {
        const [totalReview, setTotalReview] = useState();
        const [avgRating, setAvgRating] = useState(0);

        useEffect(()=>{
               restaurant&&calculateRating();
        },[restaurant])
        
        const calculateRating = () => {
                let total = 0;
                let count = 0;
                restaurant?.reviews?.forEach(item => {
                  total = total + item.star;
                  count++;
                });
                setTotalReview(count);
                const result = total/count;
                setAvgRating(result?result.toFixed(1) : 4.5);
                
            
              }
  return (
    <div>
        {restaurant?.banner?.url ?
                <div>
                <Image src={restaurant?.banner?.url} alt='banner'
                width={500}
                height={100}
                className='w-full h-[220px] object-cover rounded-xl'
                />
                </div> :
                <div className='bg-slate-200 w-full h-[220px] rounded-xl animate-pulse'>
                    </div>}
            <h2 className='text-3xl mt-3 font-bold'>{restaurant?.name}</h2>        
            <div className='flex items-center gap-2 mt-2'>
            <Image src='/star.png' alt='star'
                    width={14}
                    height={14}/>
            <label className='text-gray-400'>{avgRating} ({totalReview})</label>
            </div>
            <h2 className='text-gray-400 flex items-center gap-2 mt-2'><MapPin />{restaurant.address}</h2>
    </div>
  )
}

export default Intro