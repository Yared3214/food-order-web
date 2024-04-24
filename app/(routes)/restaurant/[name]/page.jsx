'use client'
import GlobalApi from '@/app/_utils/GlobalApi';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Intro from '../_components/Intro';
import RestroTabs from '../_components/RestroTabs';

function RestaurantDetails() {
    const param = usePathname();
    const slug = param.split('/')[2]
    const [restaurant, setRestaurant] = useState([]);
    useEffect(()=>{
        getRestaurantDetail(slug);
    },[])

    const getRestaurantDetail = (restroSlug) => {
        GlobalApi.getBusinessDetail(restroSlug).then(resp=>{
            setRestaurant(resp.restaurant)
        })
    }
  return (
    <div>
        <Intro restaurant={restaurant}/>
        <RestroTabs restaurant={restaurant}/>
    </div>
  )
}

export default RestaurantDetails