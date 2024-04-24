import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { CartUpdateContext } from '../_context/CartUpdateContext'
import { toast } from 'sonner'
import Link from 'next/link'

function Cart({cart}) {
    const {updateCart, setUpdateCart} = useContext(CartUpdateContext);

    useEffect(()=>{},[updateCart])

    const calculateCartAmount = () => {
        let total = 0;
        cart.forEach((item)=>{
            total = total + item?.price;
        })
        return total.toFixed(2);
    }

    const removeItemFromCart = (id) => {
        GlobalApi.disconnectRestroFromUserCartItem(id).then(resp=>{
            console.log(resp)
            
            if(resp){
                GlobalApi.removeItemFromCart(id).then(resp=>{
                    console.log(resp)
                    toast('Item removed!')
                    setUpdateCart(!updateCart)
                })
            }
        })
    }
  return (
    <div>
        <h2 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h2>
        <div className='flex flex-col gap-3 mt-5'>
            <h2 className='font-bold'>My Order</h2>
            {cart.map((item, index)=> (
                <div key={index} className='flex justify-between gap-8 items-center'>
                    <div className='flex gap-2 items-center'>
                    <Image src={item?.productImage}
                    alt={item.productName}
                    width={40}
                    height={40}
                    className='h-[40px] w-[40px] rounded-lg
                    object-cover'/>
                    <h2 className='text-sm '>{item?.productName}</h2>
                    </div>
                    <h2 className='font-bold flex items-center gap-2'>${item?.price}
                    <X className='text-red-500 h-4 w-4'
                    onClick={()=> removeItemFromCart(item?.id)}/>
                    </h2>
                </div>
            ))}
        </div>
        <Link href={'/checkout?restaurant='+cart[0]?.restaurant?.name}>
        <Button 
        className="w-full mt-5">Checkout ${calculateCartAmount()}</Button>
        </Link>
    </div>
  )
}

export default Cart