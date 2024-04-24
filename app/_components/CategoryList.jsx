'use client'
import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import Image from "next/image";
import Link from 'next/link'
import { ArrowRightCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function CategoryList() {
  const params = useSearchParams();
  const listRef = useRef(null);
  const [categorList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(()=>{
      setSelectedCategory(params.get('category'))
    },[params])

    useEffect(()=>{
        getCategories();
        
    },[])

    const getCategories = () => {
        GlobalApi.getCategories().then(resp=>{
          setCategoryList(resp.categories)
        })
    }

    const ScrollRightHandler = () => {
      if (listRef.current)
      {
        listRef.current.scrollBy({
          left:200,
          behavior:'smooth'
        })
      }
    }
  return (
    <div className='mt-10 relative'>
      <div className='flex gap-4 overflow-auto scrollbar-hide' 
      ref={listRef}>
        {categorList&& categorList.map((category, index) => (
          <Link key={index} href={'./?category='+category.slug}
          className={`flex flex-col items-center gap-2 border p-3 min-w-28
          rounded-xl hover:bg-orange-50 hover:border-primary 
          cursor-pointer group ${selectedCategory==category.slug && 'text-primary bg-orange-50 border-primary'}`}>
            <Image src={category.icon.url} alt={category.name}
            width={40} height={40}
            className='group-hover:scale-125 transition-all duration-200'/>
            <h2 className='text-sm font-medium group-hover:text-primary'>{category.name} </h2>
            </Link>
        ))}
      </div>
      <ArrowRightCircle
      className='absolute -right-10 top-9
       bg-gray-500 rounded-full text-white h-8 w-8 cursor-pointer'
      onClick={()=>ScrollRightHandler()}/>
    </div>
  )
}

export default CategoryList