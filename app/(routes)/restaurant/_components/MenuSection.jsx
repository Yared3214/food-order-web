import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { SquarePlus } from 'lucide-react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from "sonner"
import { CartUpdateContext } from '@/app/_context/CartUpdateContext'


function MenuSection({restaurant}) {
    const {user} = useUser();
    const [menuList, setMenuList] = useState([]);
    const {updateCart, setUpdateCart} = useContext(CartUpdateContext);

    useEffect(()=>{
        restaurant?.menu&& filterMenu(restaurant?.menu[0]?.category)
    },[restaurant])

    const filterMenu = (category) => {
        const result = restaurant?.menu?.filter((item)=>item.category==category);
        setMenuList(result[0])
    }

    const addToCartHandler = (item) => {
        toast('Adding to the Cart')
        const data = {
            email: user?.primaryEmailAddress?.emailAddress,
            price: item?.price,
            description: item?.description,
            imageUrl: item?.productImage.url,
            productName: item?.name,
            restaurantSlug: restaurant?.slug
        }
        GlobalApi.AddToCart(data).then(resp=>{
            setUpdateCart(!updateCart)
            toast('Added to Cart')
        }, (error)=>{
            toast('Failed to add in the cart')
        })  
    }
  return (
    <div>
        <div className='grid grid-cols-4'>
            <div className='hidden md:flex flex-col mr-10 gap-2'>
                {restaurant?.menu?.map((item, index)=>(
                    <Button key={index} variant='ghost'
                    onClick={()=>filterMenu(item.category)}
                    className="justify-start flex">{item.category}</Button>
                ))}
            </div>
            <div className='md:col-span-3 col-span-4'>
                <h2 className='font-extrabold text-lg'>{menuList?.category}</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
                    {menuList?.menuItem?.map((item, index)=>(
                        <div key={index} className='p-2 flex gap-3 border rounded-xl
                        hover:border-primary cursor-pointer'>
                            <Image src={item?.productImage?.url}
                            alt={item?.name}
                            width={120}
                            height={120}
                            className='h-[120px] w-[120px] object-cover rounded-xl'/>
                            <div className='flex flex-col gap-1'>
                                <h2 className='font-bold'>{item.name}</h2>
                                <h2>${item.price}</h2>
                                <h2 className='text-gray-400 line-clamp-2'>{item.description}</h2>
                                <SquarePlus onClick={()=> addToCartHandler(item)}/>
                                </div>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default MenuSection