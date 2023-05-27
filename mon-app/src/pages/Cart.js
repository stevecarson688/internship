import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { decrementQuantity, deleteItem, incrementQuanity, resetCart } from '../redux/amazonSlice';
import { cart } from '../assets/index';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';




const Cart = () => {

  const dispatch = useDispatch()
  const products = useSelector((state) => state.amazon.products);

  const [totalPrice, setTotalPrice] = useState("")
  useEffect(() => {
    let Total = 0;
    products.map((item) => {
      Total += item.price * item.quantity;
      return setTotalPrice(Total.toFixed(2))
    })
  }, [products])


  return (
    <div className='w-full bg-gray-100 p-4'>
      {
        products.length > 0 ? (
          <div className='container mx-auto h-auto grid grid-cols-5 gap-8'>
            <div className='w-full h-full bg-white px-4 col-span-4'>

              <div className='font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3'>
                <h2 className='text-3xl font-semibold'>Shopping cart</h2>
                <h4 className='text-xl font-normal'>Subtitle</h4>
              </div>

              <div>
                {
                  products.map((item) => (
                    <div key={item.id} className='w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6'>

                      <div className='w-full flex items-center justify-between gap-6'>
                        <div className='w-1/5'>
                          <img className='w-full h-44 object-contain' src={item.image} alt='ProductImg' />
                        </div>

                        <div className='w-4/5'>
                          <h2 className='font-semibold text-lg'>{item.title}</h2>
                          <p className='text-sm'>{item.description.substring(0, 200)}</p>
                          <p className='text-base'>Unit Price {" "} <span className='font-semibold'>£{item.price}</span></p>

                          <div className='bg-[#F0F2F2] flex justify-center items-center gap-1 w-24
                    text-center drop-shadow-lg rounded-md'>
                            <p>Qty:</p>

                            <p onClick={() => dispatch(decrementQuantity(item.id))} className='cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-amazon_bl duration-300'>-</p>

                            <p>{item.quantity}</p>
                            <p onClick={() => dispatch(incrementQuanity(item.id))} className='cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-amazon_bl duration-300'>+</p>

                          </div>

                          <button onClick={() => dispatch(deleteItem(item.id))} className='bg-blue-500 w-36 py-1 rounded-lg text-white mt-2
                    hover:bg-blue-700 active:bg-blue-900 duration-300'>Delete Item</button>

                        </div>

                        <div>
                          <p className='text-lg font-titleFont font-semibold'>£{item.price * item.quantity}</p>
                        </div>
                      </div>

                    </div>
                  ))
                }
              </div>

              <div onClick={() => dispatch(resetCart())} className='w-full py-2'>
                <button className='px-10 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-500
            text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide'>Clear Cart</button>
              </div>



            </div>
            <div className='w-full h-52 bg-white col-span-1 flex flex-col justify-center items-center p-4'>
              <div>
                <p><span><CheckCircleIcon className='bg-white text-blue-500 rounded-full' /></span>{" "}
                  Your order qualifies FREE Shipping Choose this option at checkout See details....</p>
              </div>

              <div>
                <p className='font-semibold px-10 py-1 flex items-center gap-2 justify-between'>Total:
                  <span className='text-lg font-bold'>£{totalPrice}</span></p>
              </div>

              <button className='w-full font-titleFont font-medium text-base bg-gradient-to-tr
          from-blue-400 to-blue-200 border hover:from-blue-300 hover:to-blue-400 border-blue-500
          hover:border-blue-700 active:bg-gradient-to-bl active:from-blue-400 active:to-blue-500 duration-200 py-1.5 rounded-md
          mt-3'>Proceed to Pay</button>

            </div>
          </div>
        ) : <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}

          className='flex justify-center items-center gap-4 py-10'>
          <div>
            <img className='w-89 rounded-lg p-4 mx-auto' src={cart} alt='cart' />
          </div>

          <div className='w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg'>
            <h1 className='font-titleFont text-xl font-bold'>Your Cart feels Lonely.</h1>
            <p className='text-sm text-center'>Your Shopping cart lives to serve. Give it purpose-fill it with books,
              electronics,videos,etc.and make it happy</p>

            <Link to="/">
              <button className='mt-6 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500
              active:bg-blue-700 px-8 py-2 font-titleFont font-semibold text-lg text-white'>Continue Shopping</button>
            </Link>
          </div>

        </motion.div>
      }
    </div>
  );
}

export default Cart