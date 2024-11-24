import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);


  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis excepturi porro repellat perferendis doloremque, officia accusantium et dignissimos quos eius illum error, asperiores vero quisquam itaque id placeat! Fugit, incidunt.
            </p>
        </div>
    </div>
  )
}

export default LatestCollection
