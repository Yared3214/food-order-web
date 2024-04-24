import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function BusinessItem({business}) {
  const calculateRating = () => {
    let total = 0;
    let count = 0;
    business?.reviews?.forEach(item => {
      total = total + item.star;
      count++;
    });
    const result = total/count;
    return result?result.toFixed(1) : '5';

  }
  return (
    <Link 
    href={'/restaurant/'+business.slug}
    className='p-3 hover:border rounded-xl
    hover:border-primary
    hover:bg-orange-50'>
        <Image src={business.banner.url} alt={business.name}
        width={500}
        height={500}
        className='h-[130px] object-cover rounded-xl'/>
        <div className='mt-2 '>
            <h2 className='font-bold text-xl'>{business.name}</h2>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <Image src='/star.png'
                    width={14}
                    height={14}/>
                    <label className='text-gray-400 text-sm'>{calculateRating()}</label>
                    <h2 className='text-gray-400 text-sm'>{business.restroType[0]}</h2>
                </div>
                <h2 className='text-sm text-primary'>{business.categories[0]?.name}</h2>
            </div>
        </div>
    </Link>
  )
}

export default BusinessItem