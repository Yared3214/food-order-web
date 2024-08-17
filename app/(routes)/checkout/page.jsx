'use client'
import { CartUpdateContext } from '@/app/_context/CartUpdateContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

function CheckOutPage() {
    const params = useSearchParams();
    const restroName = params.get('restaurant');
    const { user } = useUser();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [zip, setZip] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [cart, setCart] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [delivery, setDelivery] = useState(0);
    const [calculatedTax, setCalculatedTax] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const {updateCart, setUpdateCart} = useContext(CartUpdateContext);
    const router = useRouter();



    useEffect(()=>{
        user&&getUserCarts();
        setUserName('')
        setEmail('')
        setPhone('')
        setAddress('')
        setZip('')
    },[user, updateCart])

    const getUserCarts = () => {
        GlobalApi.getUserCarts(user?.primaryEmailAddress.emailAddress).then(resp=>{
          setCart(resp?.userCarts);
          CalculateTotalAmount(resp?.userCarts)
          if(resp?.userCarts > 0){
            setDelivery(5);
          }
        })
      }

      const CalculateTotalAmount = (_cart) => {
        let total = 0;
        _cart.forEach(item=>{
            total = total + item.price;
        })
        setSubTotal(total.toFixed(2));
        setCalculatedTax((total*0.15).toFixed(2));
        setTotalAmount((total+total*0.15+delivery).toFixed(2))
      }

      const makePayment = () => {
        setLoading(true);
        const data = {
            userEmail: user?.primaryEmailAddress?.emailAddress,
            amount: totalAmount,
            phone: phone,
            userName: user?.fullName,
            address: address,
            restroName: restroName,
            zipCode: zip
        }

        GlobalApi.CreateNewOrder(data).then(resp=>{
            const resultID = resp?.createOrder?.id;
            if(resultID){
                cart?.forEach(item=>{
                GlobalApi.updateOrderToAddOrderItem(item?.productName, 
                    item?.price, 
                    resultID, 
                    user.primaryEmailAddress.emailAddress)
                .then(resp=>{
                    if(resp){
                    toast('Order Created Successfully');
                    setUserName('')
                    setLoading(false)
                    setAddress('')
                    setEmail('')
                    setZip('')
                    setPhone('')
                    setUpdateCart(!updateCart)
                    sendEmail()
                    router.replace('/confirmation')
                    }
                }, (error)=>{
                    console.log('error');
                    setLoading(false);
                })
                })
            }
        })
      }

      const sendEmail = async() => {
        try{
            const response = await fetch('/api/send-email', {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email: user?.primaryEmailAddress.emailAddress})
            })

            if(!response.ok) {
                toast('Error Sending Email')
            } else {
                toast('Confirmation Email Sent')
            }
        } catch(error) {
            toast('Error Sending Email')
        }
      }

  return (
    <div>
        <h2 className='font-bold text-2xl my-5'>Checkout</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            <div className='md:col-span-2 mx-20'>
                <h2 className='font-bold text-3xl'>Billing Details</h2>
                <div className='grid grid-cols-2 gap-10 mt-3'>
                    <Input value={userName} placeholder='Name' onChange={(e)=> setUserName(e.target.value)}/>
                    <Input value={email} placeholder='email' onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className='grid grid-cols-2 gap-10 mt-3'>
                    <Input value={phone} placeholder='Phone' onChange={(e)=> setPhone(e.target.value)}/>
                    <Input value={zip} placeholder='zip' onChange={(e)=> setZip(e.target.value)}/>
                </div>
                <div className='mt-3'>
                    <Input value={address} placeholder='Address' onChange={(e)=> setAddress(e.target.value)}/>
                </div>
            </div>
            <div className='mx-10 border'>
                <div className='w-full bg-gray-200 text-center py-2'>
                    <h2 className='font-bold'>Total Cart({cart?.length})</h2>
                </div>
                <div className='flex flex-col gap-4 p-4'>
                <h2 className='font-bold flex justify-between'>Subtotal : <span>${subTotal}</span></h2>
                <hr></hr>
                <h2 className='flex justify-between'>Delivery : <span>${delivery}</span></h2>
                <h2 className='flex justify-between'>Tax(15%) : <span>${calculatedTax}</span></h2>
                <hr></hr>
                <h2 className='font-bold flex justify-between'>Total : <span>${totalAmount}</span></h2>
                {/* <Button onClick={()=> sendEmail()}
                disabled={userName==''|| email=='' || phone=='' || zip=='' || address=='' || cart?.length == 0}>
                    {loading ? <Loader className='animate-spin'/>
                    : 'Make Payment'}
                    </Button> */}
                    {totalAmount>5&& <PayPalButtons 
                    onApprove={makePayment}
                    style={{layout: 'horizontal'}}
                    disabled={!(userName&&cart&&zip&&email&&phone&&address)||loading}
                    createOrder={(data, actions)=>{
                        return actions.order.create({
                            purchase_units: [
                                {
                                amount:{
                                    value: totalAmount,
                                    currency_code: 'USD'
                                    
                                }
                            }]
                        })
                    }}
                    />}
                    
                </div>
            </div>x
            <div>

            </div>
        </div>
    </div>
  )
}

export default CheckOutPage