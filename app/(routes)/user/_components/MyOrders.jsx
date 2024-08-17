import GlobalApi from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


function MyOrders() {

  const { user } = useUser();
  const [orderList, setOrderList] = useState([]);

  useEffect(()=>{
    user&&getUserOrders()
  },[user])

  const getUserOrders = () => {
    GlobalApi.getUserOrders(user?.primaryEmailAddress.emailAddress).then(resp=>{
      setOrderList(resp?.orders)
    })
  }
  return (
    <div>
      <h2 className='font-bold text-lg'>My Orders</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {orderList.map((order, index)=>(
          <div className='p-3 border rounded-lg flex flex-col gap-3' key={index}>
            <h2 className='font-bold'>{moment(order?.createdAt).format('DD-MMM-yyyy') }</h2>
            <h2 className='flex justify-between text-sm'>Order Total Amout: <span>${order?.orderAmount}</span></h2>
            <h2 className='flex justify-between text-sm'>Address: <span>{order?.address}</span></h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                <h2 className='text-primary underline text-sm'>View Order Detail</h2>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-col gap-3'>
                    {order?.orderDetail?.map((item, index)=>(
                      <div className='flex justify-between'>
                        <h2>{item?.name}</h2>
                        <h2>${item?.price}</h2>
                        </div>
                    ))}
                    <hr></hr>
                    <h2 className='flex justify-between font-bold text-md mt-2'>Total Order Amout (Including Taxes + Delivery): <span>${order?.orderAmount}</span></h2>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders