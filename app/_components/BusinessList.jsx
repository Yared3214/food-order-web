'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import BusinessItem from './BusinessItem';
import BusinessItemSkeleton from './BusinessItemSkeleton';

function BusinessList() {
  const params = useSearchParams();
  const [category, setCategory] = useState('all');
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    params&&setCategory(params.get('category'));
    getBusinessList(params.get('category'));
  },[params])

  const getBusinessList = (category_) => {
    setLoading(true)
    GlobalApi.getBusiness(category_).then(resp=>{
      setBusinessList(resp.restaurants)
      setLoading(false)
    })
  }
  return (
    <div className='mt-4'>
      <h2 className='font-bold text-2xl'>Popular {category} Restaurants</h2>
      <h2 className='text-primary font-bold'>{businessList.length} results</h2>
      <div className='grid grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-7 mt-3'
      >
        {!loading ? businessList.map((business, index)=>(
          <BusinessItem key={index} business={business}/>
        ))
      : [1,2,3,4,5,6,7].map((index)=>(
        <BusinessItemSkeleton key={index}/>
      ))} 
      </div>
    </div>
  )
}

export default BusinessList