'use client'
import React, { useContext, useEffect, useState, useLocalStorage } from 'react'
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, useUser, UserButton, SignOutButton } from "@clerk/nextjs";
import { ShoppingCart } from 'lucide-react'
import { CartUpdateContext } from '../_context/CartUpdateContext';
import GlobalApi from '../_utils/GlobalApi';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Cart from './Cart';
import Link from 'next/link';


const Header = () => {
  const {user, isSignedIn} = useUser();
  const {updateCart, setUpdateCart} = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);
  useEffect(()=>{
    user&&getUserCarts();
  },[updateCart, user])

  const getUserCarts = () => {
    GlobalApi.getUserCarts(user?.primaryEmailAddress.emailAddress).then(resp=>{
      setCart(resp?.userCarts);
    })
  }

  return (
    <div className='p-6 mt-1 flex justify-between
    md:px-20 shadow-sm'>
    <div className='flex flex-row items-center gap-2 pr-5'>
        <Image src='/restaurant.png' alt='restaurant'
        width={40}
        height={40}/>
        <h2 className='text-[25px] font-bold'><span className='text-primary'>Foodie</span> Cart</h2>
    </div>
    <div className="hidden md:flex rounded-lg bg-gray-200 border w-96">
    <Input placeholder="Search" type="text"
    className="bg-transparent w-full outline-none"/>
    <Image src='/search.svg' alt='search'
    width={20}
    height={20}/>
    </div>
    {isSignedIn ? 
    <div className='flex gap-3 items-center'>
        <Popover>
  <PopoverTrigger asChild>
  <div className='flex gap-2 items-center cursor-pointer'>
      <ShoppingCart/>
      <label className='bg-slate-200 rounded-full p-1 px-3'>
    {cart?.length}
      </label>
        </div>
  </PopoverTrigger>
  <PopoverContent className="w-full">
    <Cart cart={cart}/>
  </PopoverContent>
</Popover>

        {/* <UserButton className="w-[150px] h-[150px]"/> */}
        <DropdownMenu>
          <DropdownMenuTrigger>
          <Image src={user?.imageUrl} alt='user'
        width={35}
        height={35}
        className='rounded-full'/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={'/user'}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
            <Link href={'/user#/my-orders'}><DropdownMenuItem>My Orders</DropdownMenuItem></Link>
            <DropdownMenuItem><SignOutButton>Logout</SignOutButton></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
  : <div className="flex gap-2 pr-3">
  <SignInButton mode='modal'>
  <Button variant="outline" >Login</Button>
  </SignInButton>
  <SignUpButton mode='modal'>
  <Button>SignUp</Button>
  </SignUpButton>
</div>}
    </div>
  )
}

export default Header