import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../assets/cedar-trans.png';
import styles from '../styles/Home.module.css';
import { BsCartDashFill } from 'react-icons/bs';
import { createOrGetUser } from '../utils';
import { IUser } from '../types';
import useAuthStore from '../store/authStore';

const Header = () => {
  const { addUser, userProfile}: any = useAuthStore;
  const user = 'Efemena'
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();  

  // useEffect(() => {
  //   setUser(userProfile);
  // }, [userProfile]);

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[129px] -mt-[29px] lg:pt-[2px]  h-[40px]'>
          <Image
            className='cursor-pointer rounded-3xl	'
            src={Logo}
            alt='logo'
            width={150}
            height={50}
          />
        </div>
      </Link>

      <div className='relative hidden md:block'>
        <form
          className='absolute md:static rounded-full top-10 -left-20 bg-primary'
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
            placeholder='Search accounts and videos'
          />
          <button
        
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'>
                <IoMdAdd fontSize={18} className='text-xl' />{' '}
                <span className='hidden md:block'>Upload </span>
              </button>
            </Link>
            {/* {user.image && (
              <Link href={`/`}>
                <div>
                <Image
                    className='rounded-full cursor-pointer'
                    src={user.image}
                    alt='user'
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )} */}
            {/* <div>{user}</div> */}
              <button
                type='button'
                className=' border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
                onClick={() => {
                  googleLogout();
                }}
              >
                <AiOutlineLogout color='red' fontSize={18} />
              </button>
              <Link href='/cart/mena'>
              <div className='py-2 rounded-full cursor-pointer outline-none'> <BsCartDashFill className='w-[18px] h-[18px]' /> </div>
              </Link>
          </div>
          
        ) : (
            <GoogleLogin 
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
            />
        )}
      </div>
    </div>
  );
};

export default Header;
