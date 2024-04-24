'use client'
import React, { useState } from 'react'
import Header from './_components/Header'
import { Toaster } from '@/components/ui/sonner'
import { CartUpdateContext } from './_context/CartUpdateContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function Provider({children}) {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <PayPalScriptProvider options={{ clientId: "AeQnnxV8hJGj9N8xMlDzM6R32o2KvQveR5HOoQDEGhNbrCaeYroSfD3XxRivRTEWv6u6-awEdwnspdSj"}}>
    <CartUpdateContext.Provider value={{updateCart, setUpdateCart}}>
    <div className='px-10 md:px-20 relative mb-20'>
        <Header/>
        <Toaster />
        {children}
    </div>
    </CartUpdateContext.Provider>
    </PayPalScriptProvider>
  )
}

export default Provider